package IMS_Inventory.Inventory.RestExceptionHandler;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class RestExceptionHandler {

    @ExceptionHandler
    public ResponseEntity<ApplicationException> missingItems(ResourceNotFoundException exc) {

        ApplicationException inventoryExc = new ApplicationException();
        inventoryExc.setStatus(HttpStatus.NOT_FOUND.value());
        inventoryExc.setMessage(exc.getMessage());
        inventoryExc.setTimeStamp(System.currentTimeMillis());
        // return orderExc;

        return new ResponseEntity(inventoryExc, HttpStatus.BAD_REQUEST);
    }

    // Handle generalized exceptions: RuntimeException
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ApplicationException> handleRuntimeException(RuntimeException exc) {
        ApplicationException exception = new ApplicationException();
        exception.setStatus(HttpStatus.INTERNAL_SERVER_ERROR.value());
        exception.setMessage("An unexpected error occurred: " + exc.getMessage());
        exception.setTimeStamp(System.currentTimeMillis());
        return new ResponseEntity<>(exception, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    // Handle other exceptions: Exception
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApplicationException> handleException(Exception exc) {
        ApplicationException exception = new ApplicationException();
        exception.setStatus(HttpStatus.INTERNAL_SERVER_ERROR.value());
        exception.setMessage("Something went wrong. Please try again later.");
        exception.setTimeStamp(System.currentTimeMillis());
        return new ResponseEntity<>(exception, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler
    public ResponseEntity<ApplicationException> handleIllegalArgument(IllegalArgumentException exc) {
        ApplicationException appExc = new ApplicationException();
        appExc.setStatus(HttpStatus.BAD_REQUEST.value());
        appExc.setMessage(exc.getMessage());
        appExc.setTimeStamp(System.currentTimeMillis());
        return new ResponseEntity<>(appExc, HttpStatus.BAD_REQUEST);
    }


    @ExceptionHandler
    public ResponseEntity<ApplicationException> handleInvalidCredentialsException(InvalidCredentialsException exc) {
        ApplicationException appExc = new ApplicationException();
        appExc.setStatus(HttpStatus.BAD_REQUEST.value());
        appExc.setMessage(exc.getMessage());
        appExc.setTimeStamp(System.currentTimeMillis());
        return new ResponseEntity<>(appExc, HttpStatus.BAD_REQUEST);
    }
}
