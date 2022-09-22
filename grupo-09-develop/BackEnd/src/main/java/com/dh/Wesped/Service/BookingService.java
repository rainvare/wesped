package com.dh.Wesped.Service;

import com.dh.Wesped.Email.EmailSender;
import com.dh.Wesped.Model.Booking;
import com.dh.Wesped.Model.Product;
import com.dh.Wesped.Model.User;
import com.dh.Wesped.Repository.BookingRepository;
import com.dh.Wesped.Repository.ProductRepository;
import com.dh.Wesped.Repository.UserRepository;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookingService {

    private static final Logger logger = Logger.getLogger(BookingService.class);
    private BookingRepository bookingRepository;
    @Autowired
    private EmailSender emailSender;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    public BookingService(BookingRepository bookingRepository) {
        this.bookingRepository = bookingRepository;
    }

    public Booking newBooking(Booking booking) {
        logger.debug("Guardando nueva reserva: " + booking);
        User user = userRepository.findById(booking.getUser().getId()).get();
        Product product = productRepository.findById(booking.getProduct().getId()).get();
        String email = user.getEmail();
        String productName = product.getTitle();
        String bookingBody = emailSender.styleBookingBody(
                user.getName(),
                productName,
                booking.getHour().toString(),
                booking.getCheckin().toString(),
                booking.getCheckout().toString());
        emailSender.sendEmail(email, "Reserva Exitosa - Wesped", bookingBody);
        logger.debug("Email enviado de confirmacion de reserva");
        return bookingRepository.save(booking);
    }

    public List<Booking> getAllBookings() {
        logger.debug("Listando reservas: ");
        return bookingRepository.findAll();
    }

    public List<Booking> filterByProductId(Integer id) {
        logger.debug("Buscando reservas con producto id: " + id);
        return bookingRepository.findByProductId(id);
    }

    public List<Booking> filterByUserId(Integer id) {
        logger.debug("Buscando reservas del usuario con id: " + id);
        return bookingRepository.findByUserId(id);
    }
}