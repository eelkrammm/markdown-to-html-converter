const markdownInput = document.getElementById("markdown-input"); 
const output = document.getElementById("html-output"); 
const preview = document.getElementById("preview");

let arrayConvert = [
  {
    markdown: /^#\s+(.*)$/m,
    html: function(input) {
      return input.replace(/^#\s+(.*)$/gm, "<h1>$1</h1>");
    }
  },
  {
    markdown: /^##\s+(.*)$/m,
    html: function(input) {
      return input.replace(/^##\s+(.*)$/gm, "<h2>$1</h2>");
    }
  },
  {
    markdown: /^###\s+(.*)$/m,
    html: function(input) {
      return input.replace(/^###\s+(.*)$/gm, "<h3>$1</h3>");
    }
  }, 
  {
  markdown: /\*\*(.*?)\*\*/m, 
  html: function(input){
    let lines = input.split(/\r?\n/);
    let processedLines = lines.map(function(line) {
        if (/\*\*(.*?)\*\*/g.test(line)) {
          let cleanItem = line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>"); 
          return cleanItem;
        }
        return line;
      });
  return processedLines.join("\n")}}, 
  {
  markdown: /\*(.*?)\*/m, 
  html: function(input) {
      return input.replace(/\*(.*?)\*/g, "<em>$1</em>");
    }},  
  {
  markdown: /__(.*?)__/, 
  html: function(input){
    let lines = input.split(/\r?\n/);
    let processedLines = lines.map(function(line) {
        if (/__(.*?)__/g.test(line)) {
          let cleanItem = line.replace(/__(.*?)__/g, "<strong>$1</strong>"); 
          return cleanItem;
        }
        return line;
      });
  return processedLines.join("\n")}},
  {
  markdown: /_(.*?)_/, 
  html: function(input) {
      return input.replace(/_(.*?)_/g, "<em>$1</em>");
    }}, 
  {
    markdown: /!\[(.*?)\](.*?)/, 
    html: function(input){
      return input.replace(/!\[(.*?)\]\((.*?)\)/g, '<img alt="$1" src="$2">')
    }
  }, 
  {markdown: /\[(.*?)\]\((.*?)\)/g,
    html: (input) => input.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>')}, 
    {
     markdown: /^>\s+(.*)$/m,
  html: function(input) {
    return input.replace(/^>\s+(.*)$/gm, "<blockquote>$1</blockquote>").replace(/\n/g, "");
  }}  ]


function convertMarkdown(){
  
  let input = markdownInput.value;
  let result = input;
   arrayConvert.forEach(function(item, index){
    let before = result;
    result = item.html(result);
    if (before.includes("\n") && !result.includes("\n")) {
      console.log("NEWLINE HILANG di handler index:", index, item.markdown);
    }
  });
  output.textContent = result;
  preview.innerHTML = result;
  return result;
}

markdownInput.addEventListener("input", convertMarkdown);

let testInput = "> this is a quote\n> this is another quote";
let result = testInput.replace(/^>\s+(.*)$/gm, "<blockquote>$1</blockquote>");
console.log(result);

