package com.dh.Wesped.Controller;

import com.dh.Wesped.Model.Booking;
import com.dh.Wesped.Service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/bookings")
public class BookingController {

    private BookingService bookingService;

    @Autowired
    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    @PostMapping
    public ResponseEntity<Booking> createNewBooking(@RequestBody @Valid Booking booking) {
        booking.setObservations("No Observations");
        booking.setVaccineCovid19(true);
        return ResponseEntity.status(HttpStatus.CREATED).body(bookingService.newBooking(booking));
    }

    @GetMapping
    public ResponseEntity<List<Booking>> listAllBookings() {
        return ResponseEntity.ok(bookingService.getAllBookings());
    }

    @GetMapping("/product/{productId}")
    public ResponseEntity<List<?>> getAllBookingsByProductId(@PathVariable Integer productId) {
        return ResponseEntity.ok(bookingService.filterByProductId(productId));
    }

    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<?>> getAllBookingsByUserId(@PathVariable Integer userId) {
        return ResponseEntity.ok(bookingService.filterByUserId(userId));
    }
}