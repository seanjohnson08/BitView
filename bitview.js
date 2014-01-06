function BitView(mem){
  this.length = mem.byteLength*8;
  this.bytes = new Uint8Array(mem);
}
BitView.prototype.get=function(bitIndex){
  return this.bytes[Math.floor(bitIndex/8)] & (128 >> bitIndex%8)? 1 : 0;
};
BitView.prototype.slice=function(start,end){
  var i,bits=[];
  end=end||this.length;
  for(i=start||0;i<end;i++) {
    bits.push(this.get(i));
  }
  return bits;
};
BitView.prototype.set = function(bitIndex,value){
  var byteIndex = Math.floor(bitIndex/8),
      mask = 128 >> bitIndex%8;
  if(value) {
    this.bytes[byteIndex] |= mask;
  } else {
    this.bytes[byteIndex] &= ~mask;
  }
};

/*USAGE*/

var mem = new ArrayBuffer(10);

var bitview = new BitView(mem);

bitview.set(10,1);
bitview.set(9,1);
bitview.set(8,1);
bitview.set(6,1);

//get single bit
console.log(bitview.get(6)); //1

//start at bit index 5, get 5 bits
console.log(bitview.slice(5,10)); //[0','1','0','1','1']

//get all bits
console.log(bitview.slice());