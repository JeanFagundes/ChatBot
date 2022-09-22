class ReceiveMessageConstructor {
  constructor({ msg_body, phon_no_id, from }) {
    this.msg_body = msg_body;
    // this.msg_interactive = msg_interactive || undefined;
    this.phon_no_id = phon_no_id;
    this.from = from;
  }

  // validacoes() {
  //   if (this.msg_body && this.msg_interactive === undefined) {
  //     throw new Error('Corpo da mensagem e quick reply ausentes');
  //   }
  //   if (this.msg_body !== undefined) {
  //     console.log('body encontrado');
  //   }
  //  else if (this.msg_interactive !== undefined) {
  //   console.log('interactive encontrado');
  // }
}

module.exports = ReceiveMessageConstructor;
