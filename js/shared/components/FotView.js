import React,{Component} from 'react';

export default class FotView extends Component {
  constructor(props){
    super(props);
  }
  handleDelete(e){
    const id = Number(e.target.dataset.id);
    this.props.deleteFot(id);
  }

  handleEdit(e){
    const id  = Number(e.target.dataset.id);
    const val = this.props.fot.get(id).text
    let newVal = window.prompt('', val);
    this.props.editFot(id, newVal);
  }
 
  render() {
    console.log('FormView');
    console.log(this.props.fot);
    return (
      <div id="fot-list">
        {
          this.props.fot.map((fot, index) => {
            return (
              <div key={index}>
                <span>{fot}</span>
                <button data-id={index} onClick={this.handleDelete.bind(this)}>
                  X
                </button>
                <button data-id={index} onClick={this.handleEdit.bind(this)}>
                  Edit
                </button>
              </div>
            );
          })
        }
      </div>
    );
  }
}