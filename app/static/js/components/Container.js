var React = require("react");

var MessageForm = React.createClass({
	onSubmit: function(e) {
		e.preventDefault();
		var name = this.refs.name.getDOMNode().value.trim();
		var comment = this.refs.comment.getDOMNode().value.trim();

		this.props.submit(name, comment);
		this.refs.name.getDOMNode.value = "";
		this.refs.comment.getDOMNode.value = "";
	},
	render: function() {
		return(
			<div className="well">
			<h4> Leave a Message </h4>
				<div className="form-group">
					<label for="exampleinputemail1">name</label>
					<input ref="name" className="form-control" placeholder=""></input>
				</div>
				<div className="form-group">
					<label for="exampleinputemail1">content</label>
					<textarea ref="comment" className="form-control" placeholder=""></textarea>
                </div>
                <a onTouch={this.onSubmit} className="btn btn-primary">touch</a>
                <a onClick={this.onSubmit} className="btn btn-primary">click</a>
            </div>

		)
	}
});

var MessageList = React.createClass({

	render: function() {
		var message = this.props.data.map(function(item){
			return (
                <div class="form-group">
                  <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1">{item.name}</h5>
                    <small>{item.create_at}</small>
                  </div>
                  <textarea class="form-control" rows="5" cols="81">{item.comment}</textarea>
                </div>
			)
		});
		return(
			<form id="message-container">
			{message}
			</form>
		)
	}
})


var Container = React.createClass({
	getInitialState : function(){
		return {
			data: []
		}
	},
	submit: function(name, comment) {
		$.ajax({
			type:'post',
			url:'/post',
			data:{name:name, comment:comment}
		}).done(function(data) {
			this.listComment();
		}.bind(this));
	},
	listComment: function() {
		$.ajax({
			type:'get',
			url:'/get',
		}).done(function(resp) {
			if(resp.status == "success"){
				this.setState({
					data:resp.data
				})
			}

		}.bind(this));
	},
	componentDidMount: function() {
		this.listComment();
	},
	render: function() {
		return(
			<div>
				<div className="col-xs-12 col-md-4">
					<MessageForm submit={this.submit} />
				</div>
				<div className="well">
					<div className="col-xs-12 col-md-8">
						<MessageList data={this.state.data} />
					</div>
				</div>
			</div>

		)
	}
})

module.exports = Container;
