/**
*  YFROBOT  i2c Sonar Sensor
*/

//% color="#45b787" weight=8 icon="\uf12e"
namespace YFSonar {

    let YFSONAR_I2C_ADDR = 0x57;
    let YFSONAR_WIRTE_CODE = 0x01;

    /**
     * read sonar
     */
    //% blockId="YFSonar_readSonar" weight=100 blockGap=15
    //% block="read sonar (I2C)"
    export function readSonar() {
        let fifo_data: number[] = []
        let distance: number;

        pins.i2cWriteNumber(YFSONAR_I2C_ADDR, YFSONAR_WIRTE_CODE, NumberFormat.UInt8BE, false);
        basic.pause(120)
        
        fifo_data[0] = pins.i2cReadNumber(YFSONAR_I2C_ADDR, NumberFormat.Int32BE, false);

        // fifo_data[1] = pins.i2cReadNumber(YFSONAR_I2C_ADDR, NumberFormat.UInt8BE, true);
        // fifo_data[2] = pins.i2cReadNumber(YFSONAR_I2C_ADDR, NumberFormat.UInt8BE, false);
        // distance=(fifo_data[0]*65536 + fifo_data[1]*256 + fifo_data[2])/10000;        //计算成CM值  

        // distance= (fifo_data[0] >> 8) / 10000;        //计算成CM值  
        distance = fifo_data[0] / 256000;        //计算成MM值  

        distance = Math.floor(distance * 10) / 10   // 保留小数
        
        if (distance >= 30 || distance <= 5000) { 
            return distance;
        } else { // 盲区及超限
            return 0;
        }
    }


    // function wireWriteByte(val: NumberFormat.UInt8BE): boolean {
    //     pins.i2cWriteNumber(YFSONAR_I2C_ADDR, val, NumberFormat.UInt8BE)
    //     return true;
    // }

    // function wireWriteDataByte(reg: number, val: number): boolean {
    //     let buf = pins.createBuffer(2)
    //     buf[0] = reg;
    //     buf[1] = val;
    //     pins.i2cWriteBuffer(YFSONAR_I2C_ADDR, buf)
    //     return true;
    // }

    // function wireReadDataByte(reg: number): number {
    //     pins.i2cWriteNumber(YFSONAR_I2C_ADDR, reg, NumberFormat.UInt8BE);
    //     let val: number = pins.i2cReadNumber(YFSONAR_I2C_ADDR, NumberFormat.UInt8BE)
    //     return val
    // }

}