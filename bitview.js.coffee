class BitView
    constructor:(mem)->
        @length = mem.byteLength*8
        @intview = new Uint8Array mem
    get:(bitIndex, length)->
        if !bitIndex? and !length?
            bitIndex = 0
            length = @length
        length = length || 1
        byteIndex = Math.floor bitIndex/8
        bits = []

        for byte in [0..Math.ceil length/8+1]
            for bit in [0..8]
                bits[byte*8+bit] = if @intview[byteIndex+byte]&(1<<(7-bit)) then 1 else 0

        bits = bits[bitIndex%8...bitIndex%8+length]
        if bits.length==1 then bits[0] else bits
    set:(bitIndex, value)->
        byteIndex = Math.floor bitIndex/8
        mask = 1<<(7-bitIndex%8)
        if value
            @intview[byteIndex] |= 
        else
            @intview[byteIndex] &= ~mask


#USAGE

mem = new ArrayBuffer 10
bitview = new BitView mem

bitview.set 6, 1
bitview.set 8, 1
bitview.set 9, 1
bitview.set 10,1

#get single bit
bitview.get 6 #1

#start at bit index 5, get 5 bits
console.log bitview.get 5,5 #[0,1,0,1,1]

#get all bits
bitview.get()