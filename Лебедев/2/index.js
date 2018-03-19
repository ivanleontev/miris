const builder = require('xmlbuilder');
const fs = require('fs');

let documents = builder.create('documents')

let doc1 =  documents.ele('document');
doc1.ele('name', 'schedule');
doc1.ele('format', 'xlsx');
doc1.ele('size', '100');

let doc2 =  documents.ele('document');
doc2.ele('name', 'formula');
doc2.ele('format', 'docx');
doc2.ele('size', '300');

let doc3 =  documents.ele('document');
doc3.ele('name', 'exam');
doc3.ele('format', 'docx');
doc3.ele('size', '1500');

let doc4 =  documents.ele('document');
doc4.ele('name', 'course work');
doc4.ele('format', 'docx');
doc4.ele('size', '1200');


fs.writeFileSync("auto.xml", documents.end({ pretty: true}))

console.log('success');