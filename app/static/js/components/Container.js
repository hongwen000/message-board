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
	onDelete: function(id, e) {
		$.ajax({
			type:'post',
			url:'/delete',
			data:{id:id}
		}).done(function(data) {
			if(data.status == "success"){
			alert("ok")
			location.reload();
			this.listComment();
		} else {
			alert("failed")
		}
	}.bind(this));
	},
	render: function() {
		const left = {float:'left'}
		const right = {float:'right'}
		var message = this.props.data.map(function(item){
			return (
					<div href="#" class="list-group-item list-group-item-action flex-column align-items-start active">
							{/* <div id="block_container" >
								<li className="list-group-item" style={left}>{item.name}</li>
								<button onClick={this.onDelete} className="btn btn-primary" style={right}>delete</button>
							</div> */}
						<div className="well">
                <div class="form-group">
                  <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1">{item.name}</h5>
                    <small>{item.create_at}</small>
										{/* <a onClick={this.props.myalert.bind(this)} className="btn btn-primary">click</a> */}
										<a onClick={this.onDelete.bind(this, item.id)} className="btn btn-primary" style={right}>delete</a>
                  </div>
                  <textarea class="form-control" rows="5" cols="81">{item.comment}</textarea>
                </div>
						</div>
					</div>
			)
		}, this);
		return(
			<ul className="list-group" id="message-container">
			{message}
			</ul>

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
			location.reload();
			this.listComment();
		}.bind(this));
	},
	delete: function(id) {
		alert(id);
		$.ajax({
			type:'post',
			url:'/post',
			data:{id:id}
		}).done(function(data) {
			location.reload();
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
				}, function () {
					this.render();
			})
			}
		}.bind(this));
	},
	componentDidMount: function() {
		this.listComment();
	},
	myalert: function() {
		alert("my alter!")
	},
	render: function() {
		// alert(JSON.stringify(this.state.data))
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
