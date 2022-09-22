provider "aws" {
    region = "us-east-2"
}

data "aws_ami" "ubuntu" {
    most_recent = true
    owners      = ["amazon"]
    filter {
        name   = "name"
        values = ["amzn2-ami-hvm*"]
    }
}

resource "aws_security_group" "Wesped-SG" {
    name        = "Wesped-SG"
    description = "Allow SSH inbound traffic"
    vpc_id      = vpc-0ca9d0ecaec1494da
    ingress {
        description = "SSH from the internet"
        from_port   = 22
        to_port     = 22
        protocol    = "tcp"
        cidr_blocks = ["0.0.0.0/0"]
    }
    egress {
        from_port   = 0
        to_port     = 0
        protocol    = "-1"
        cidr_blocks = ["0.0.0.0/0"]
    }
    tags = {
        Name = "Wesped-SG"
    }
}

resource "aws_instance" "Wesped-BackEnd-Terraform" {
    ami                         = data.aws_ami.ubuntu.id
    associate_public_ip_address = true
    instance_type               = "t2.micro"
    key_name                    = "Wesped-BackEnd"
    subnet_id                   = subnet-0633a45ceea6e4845
    vpc_security_group_ids      = aws_security_group.Wesped-SG.id
}

resource "aws_s3_bucket" "wesped-terraform" {
  bucket = "wesped-terraform"
}

resource "aws_s3_bucket_acl" "wesped-terraform" {
  bucket = aws_s3_bucket.wesped-terraform.id

  acl = "public-read"
}

resource "aws_s3_bucket_website_configuration" "wesped-terraform" {
  bucket = aws_s3_bucket.wesped-terraform.bucket

  index_document {
    suffix = "index.html"
  }
}

resource "aws_s3_bucket_policy" "allow_access_from_another_account" {
  bucket = aws_s3_bucket.wesped-terraform.id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid       = "PublicReadGetObject"
        Effect    = "Allow"
        Principal = "*"
        Action    = "s3:GetObject"
        Resource = [
          aws_s3_bucket.wesped-terraform.arn,
          "${aws_s3_bucket.wesped-terraform.arn}/*",
        ]
      },
    ]
  })
}