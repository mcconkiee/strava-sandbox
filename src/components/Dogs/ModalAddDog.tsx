import * as React from 'react';
import Dog from 'src/models/Dog';

export interface ModalDogUI {
  addDog: (dog: Dog) => void;
  error: Error
}

interface DogFormState {
  dog: Dog
}


class ModalDog extends React.Component<ModalDogUI,DogFormState>{
  constructor(p: ModalDogUI) {
    super(p);
    this.state ={dog:new Dog("")}
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(data: React.FormEvent<HTMLInputElement>){    
    const currentDog = this.state.dog;
    currentDog.name = data.currentTarget.value;
    this.setState({dog:currentDog})
  }
  render() {    
    const {error} = this.props
    return (
      <div id="modal-dog" className="uk-flex-top" uk-modal={1}>
        <div className="uk-modal-dialog uk-modal-body uk-margin-auto-vertical">
          <div>
            <h2 className="uk-modal-title">Add a Dog!</h2>
            <div>
            {error ? error.message : null}
            </div>
            <div className="uk-form-stacked">
              <div className="uk-margin">
                <label className="uk-form-label" >Name</label>
                <div className="uk-form-controls">
                  <input className="uk-input" type="text" placeholder="Coco" value={this.state.dog.name} onChange={this.handleChange} />
                </div>
              </div>
              <div className="uk-margin">
                <div className="uk-form-controls">
                  <button onClick={()=>{                    
                    this.props.addDog(this.state.dog);
                    UIkit.modal("#modal-dog").hide();
                  }} className="uk-button uk-button-primary">Send</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ModalDog;
