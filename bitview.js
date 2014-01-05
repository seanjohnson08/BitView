function BitView(mem){
  this.length = mem.byteLength*8;
  this.intview = new Uint8Array(mem);
}
BitView.prototype.get=function(bitIndex,length){
  if(bitIndex === undefined && length === undefined) {
    bitIndex=0;
    length=this.length;
  }
  length = length || 1;
  var byteIndex = Math.floor(bitIndex/8),
      bit,
      bits=[];
  
  for(byte=0;byte<=Math.ceil(length/8);byte++) {
    for(bit=0;bit<8;bit++) {
      bits[byte*8+bit]=
        this.intview[byteIndex+byte]&(1<<(7-bit))?1:0;
    }
  }
  
  bits=bits.slice(bitIndex%8,bitIndex%8+length);

  return bits.length==1?bits[0]:bits;
};
BitView.prototype.set=function(bitIndex,value){
  value = value?1:0;
  this.intview[Math.floor(bitIndex/8)]|=value<<(7-bitIndex%8);
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
console.log(bitview.get(5,5)); //[0','1','0','1','1']

//get all bits
console.log(bitview.get());
