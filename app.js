CodeMirror.defineMode("fad", function() {

  return {
  	startState: function(){
	  	return {
	  		inVar: false,
	  	};
	},
    token: function(stream, state) {
      if (stream.sol()) {
      	if (stream.string.substring(0, 3) != '   ') {
      		stream.skipToEnd();
      		return 'comment';
      	}
      }
      stream.eatSpace();
      
      l = stream.next();
      // digits or index
      if (/\d/.test(l) && state.inVar) {
      	stream.match(/\d/);
      	state.inVar = false;
      	return 'number'
      };

      if (stream.eol() || (l == ',') || (l.toLowerCase() == l)) {
      	state.inVar = false;
      	return
      }
      state.inVar = true;
      stream.match(/^\s\d\,/)
      return 'variable';
    }
  };
});

var editor = new CodeMirror.fromTextArea(
	document.getElementById('source'), {
    lineNumbers: true,
    lineWrapping: true,
    mode: "fad",
    theme: "fad",
    indentUnit: 3,
    tabSize: 3
 });

editor.setOption("extraKeys", {
  Tab: function(cm) {
    var spaces = Array(cm.getOption("indentUnit") + 1).join(" ");
    cm.replaceSelection(spaces);
  }
});