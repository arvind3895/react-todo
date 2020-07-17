import React, { Component } from "react";
import { Modal, Button } from "antd";

export default class GenericModal extends Component {
  showModal = () => {
    this.props.updateVisible(true, this.props.index);
  };

  handleCancel = (e) => {
    this.props.updateVisible(false, this.props.index);
  };

  render() {
    return (
      <div>
        <Button onClick={this.showModal} type={this.props.buttonType}>
          {this.props.buttonTitle}
          {this.props.icon ? this.props.icon : ""}
        </Button>
        <Modal
          title={this.props.modalData.title}
          visible={this.props.visible}
          onCancel={this.handleCancel}
          footer={null}
        >
          {this.props.children}
        </Modal>
      </div>
    );
  }
}
