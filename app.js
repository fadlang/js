CodeMirror.defineMode("fad", function() {

  return {
    startState: function(){
      return {
        inNumber: false,
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

      if (state.inNumber) {
        state.inNumber = false;
        stream.eatWhile(/[^\s\,]/);
        return 'number';
      };

      //  index
      if (l == '_') {
        n = stream.peek();
        if ((!n) || (n.match(/[\s\,]/))) {
          return ;
        }

        state.inNumber = true;
        return 'under';
      };


    },
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