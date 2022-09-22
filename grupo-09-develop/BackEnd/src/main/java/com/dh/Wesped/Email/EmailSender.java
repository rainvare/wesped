package com.dh.Wesped.Email;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

@Service
public class EmailSender {

    private static final Logger logger = Logger.getLogger(EmailSender.class);
    @Autowired
    private JavaMailSender mailSender;

    @Async
    public void sendEmail(String toEmail, String subject, String body) {
        try {
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");
            helper.setText(body, true);
            helper.setTo(toEmail);
            helper.setSubject(subject);
            helper.setFrom("proyecto.wesped@gmail.com");
            mailSender.send(mimeMessage);
            logger.debug("Email enviado a: " + toEmail);
        } catch (MessagingException e) {
            logger.error("No se pudo enviar email", e);
            throw new IllegalStateException("Fallo en el envio de email");
        }
    }

    public String styleRegisterBody(String name) {
        return "<div style=\"border-color: #4682B4;\n" +
                "                border-style: solid;\n" +
                "                color:#2F4F4F;\n" +
                "                font-family:'Roboto', sans-serif;\n" +
                "                font-size:16px;\n" +
                "                width: fit-content;\">\n" +
                "        <h1 style=\"text-align: center;\">Bienvenid@ a Wesped</h1>\n" +
                "        <h2 style=\"text-align: center;\">Hola " + name + "</h2>\n" +
                "        <p>Te acabas de registrar exitosamente en Wesped</p>\n" +
                "        <p>Ya puedes iniciar sesión y empezar a buscar tu próximo lugar de hospedaje</p>\n" +
                "    </div>";
    }

    public String styleBookingBody(String name, String productName, String hour, String checkIn, String checkOut) {
        return "<div style=\"border-color: #4682B4;\n" +
                "                border-style: solid;\n" +
                "                color:#2F4F4F;\n" +
                "                font-family:'Roboto', sans-serif;\n" +
                "                font-size:16px;\n" +
                "                width: fit-content;\">\n" +
                "        <h1 style=\"text-align: center;\">Reserva exitosa</h1>\n" +
                "        <h3>¡Hola " + name + "!, estos son los detalles de tu reserva:</h2>\n" +
                "        <p>Acabas de realizar una reserva para " + productName + " </p>\n" +
                "        <p>Hora estimada de llegada: " + hour + "</p>\n" +
                "        <p>Check in: " + checkIn + "</p>\n" +
                "        <p>Check out: " + checkOut + "</p>\n" +
                "    </div>";
    }
}