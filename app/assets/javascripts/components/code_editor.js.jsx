var CodeEditor = React.createClass({
    componentDidMount: function () {
        this.editor = ace.edit(this.getDOMNode());
        this.editSession = this.editor.getSession();

        this.setLanguage(this.props.language);
        this.setTheme(this.props.theme);
        this.setCode(this.props.code, !this.props.shared);
        this.focus();
    },

    componentWillUnmount: function () {
        this.editor.destroy();
    },

    setLanguage: function(language){
        var mode = utils.getMode(language);

        this.editSession.setMode('ace/mode/' + mode);
        this.setCode(null, true);
    },

    setTheme: function(theme){
        this.editor.setTheme('ace/theme/'+ theme);
    },

    setCode: function (code, useSample) {
        if (useSample)
            code = utils.getSample(this.props.language);

        this.editor.setValue(code);
        this.setCursor();
    },

    setCursor: function () {
        var lastLine = this.editSession.getLength();

        this.editor.gotoLine(lastLine);
        this.focus();
    },

    focus: function(){
        this.editor.focus();
    },

    render: function () {
        return <div className="editor-body"></div>;
    }
});
