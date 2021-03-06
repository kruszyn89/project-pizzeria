import { templates, select } from '../settings.js';
import AmountWidget from './AmountWidget.js';
import DatePicker from './DatePicker.js';
import HourPicker from './HourPicker.js';

class Booking {

  constructor(element){
    const thisBooking = this;

    thisBooking.render(element);
    thisBooking.initWidgets();
  }

  render (element){
    const thisBooking = this;  
    const generatedHTML = templates.bookingWidget(element);

    thisBooking.dom = {};
    thisBooking.dom.wrapper = element;
    thisBooking.dom.wrapper.innerHTML = generatedHTML;

    thisBooking.dom.peopleAmount = element.querySelector(select.booking.peopleAmount);
    thisBooking.dom.hoursAmount = element.querySelector(select.booking.hoursAmount);

    thisBooking.dom.datePicker = element.querySelector(select.widgets.datePicker.wrapper);
    thisBooking.dom.hourPicker = element.querySelector(select.widgets.hourPicker.wrapper);
  }

  initWidgets (){
    const thisBooking = this;

    thisBooking.peopleAmount = new AmountWidget(thisBooking.dom.peopleAmount);
    thisBooking.dom.peopleAmount.addEventListener('click', function(){

    });

    thisBooking.hoursAmount = new AmountWidget(thisBooking.dom.hoursAmount);
    thisBooking.dom.hoursAmount.addEventListener('click', function(){

    });

    thisBooking.datePicker = new DatePicker(thisBooking.dom.datePicker);
    thisBooking.dom.datePicker.addEventListener('click', function(){

    });

    //skonczylem na tym, punkt Po drugie, w metodzie initWidgets zadbaj o to, aby uruchomić na obu elementach odpowiednie widgety.
    thisBooking.hourPicker = new HourPicker(thisBooking.dom.hourPicker);
    thisBooking.dom.hourPicker.addEventListener('click', function(){
      
    });


  }
}

export default Booking;