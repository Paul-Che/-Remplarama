var Inbox = React.createClass({
  getInitialState: function() {
    return {
      selectedConversationId: this.props.selected_conversation_id,
      firstName: this.props.first_name,
      lastName: this.props.last_name,
      conversations: this.props.conversations,
      messages: this.props.messages
    }
  },

  render: function() {
    return (
      <div className="container" id="react-inbox">
        <div className="row">
          <div className="col-sm-5" id="conversation-list">
            <div className="panel panel-default">
              <div className="panel-heading">
                <h4>Boîte de réception</h4>
              </div>
              <div className="panel-body">
                <ConversationList
                  conversations={this.state.conversations}
                  onConversationSelection={this.handleConversationSelection}
                  selectedConversationId={this.state.selectedConversationId}
                />
              </div>
            </div>
          </div>
          <div className="col-sm-7" id="message-list">
            <div className="panel panel-default">
              <div className="panel-heading">
                <h4>{this.state.firstName} {this.state.lastName}</h4>
              </div>
              <div className="panel-body">
                <div id="wrapper-conversations">
                  <MessageList
                    messages={this.state.messages}
                  />
                </div>
                <CreateMessage
                  onMessageCreation={this.handleMessageCreation}
                  selectedConversationId={this.state.selectedConversationId}
                  ref="createMessage"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  },

  handleConversationSelection: function(conversationId) {
    var that = this
    $.ajax({
      type: 'GET',
      url: Routes.conversations_path({format: 'json', conversation_id: conversationId}),
      success: function(data) {
        that.setState({
          selectedConversationId: data.selected_conversation_id,
          firstName: data.first_name,
          lastName: data.last_name,
          conversations: data.conversations,
          messages: data.messages
        })
      }
    })
  },

  handleMessageCreation: function(conversationId, content) {
    var that = this
    $.ajax({
      type: 'POST',
      url: Routes.conversation_messages_path({format: 'json', conversation_id: conversationId}),
      data: { message: { content: content } },
      success: function(data) {
        that.setState({
          selectedConversationId: data.selected_conversation_id,
          firstName: data.first_name,
          lastName: data.last_name,
          conversations: data.conversations,
          messages: data.messages
        })
        that.refs.createMessage.handleCancel()
      }
    })
  }
})
