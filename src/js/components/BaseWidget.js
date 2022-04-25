//klasa nadrzędna
class BaseWidget{
  constructor(wrapperElement, initialValue){
    const thisWidget = this;

    thisWidget.dom = {};
    thisWidget.dom.wrapper = wrapperElement;

    thisWidget.correctValue = initialValue;
  }

  get value(){
    const thisWidget = this;

    return thisWidget.correctValue;
  }

  //sluzy do ustawianai wartosci widgetu jesli jest to wartosc prawidlowa.  
  set value(value){
    const thisWidget = this;

    const newValue = thisWidget.parseValue(value);
    
    /* TO DO: Add validation */
    if(thisWidget.correctValue !== newValue && !isNaN(newValue) && thisWidget.isValid(newValue)){
      thisWidget.correctValue = newValue;
      thisWidget.announce();
    }
    thisWidget.renderValue();
  }

  setValue(value){
    const thisWidget = this;

    thisWidget.value = value;
    console.log(value); 
  }

  //metoda przeksztalca wartosc na odpowiedni typ lub format
  parseValue(value){
    return parseInt(value);
  }

  isValid(value){
    return !isNaN(value);
  }

  renderValue(){
    const thisWidget = this;
    
    thisWidget.dom.wrapper.innerHTML = thisWidget.value;
  }

  announce(){
    const thisWidget = this;

    const event = new CustomEvent('updated',{
      bubbles: true
    });
    thisWidget.dom.wrapper.dispatchEvent(event);
  }

}

export default BaseWidget;