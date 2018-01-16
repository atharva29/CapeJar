
var fruits, text, fLen, i;

fruits = ["Banana", "Orange", "Apple", "Mango"];
fruits.push("lemon");
fLen = fruits.length;
text = "<ul>";
for (i = 0; i < fLen; i++) {
  text += "<li>" + fruits[i] + "</li>";
}
document.getElementById('demo').innerHTML = text ;

age = 1 ;
var votable = (age < 18)?"Too younge":"Old enough" ;
document.getElementById('display').innerHTML = votable ;
