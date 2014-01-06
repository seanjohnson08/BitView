class BitView
    constructor:(mem)->
        @length = mem.byteLength*8
        @bytes = new Uint8Array mem
    get:(bitIndex)->
        if this.bytes[Math.floor(bitIndex/8)] & (128 >> bitIndex%8) then 1 else 0
    slice:(start,end)->
        start = start||0
        end = end||@length
        bits = @get i for i in [start...end]
    set:(bitIndex, value)->
        byteIndex = Math.floor bitIndex/8
        mask = 128 >> bitIndex%8
        if value
            @bytes[byteIndex] |= mask
        else
            @bytes[byteIndex] &= ~mask


#USAGE

mem = new ArrayBuffer 10
bitview = new BitView mem

bitview.set 6, 1
bitview.set 8, 1
bitview.set 9, 1
bitview.set 10,1

#get single bit
console.log bitview.get 6 #1

#start at bits from index 5 through 10
console.log bitview.slice 5,10 #[0,1,0,1,1]

#get all bits
bitview.slice()