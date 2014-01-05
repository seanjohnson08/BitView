BitView
=======

Stores data in an ArrayBuffer allowing you to set and view specific bits.

## Code Usage
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
