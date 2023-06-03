function INDIETRO () {
    maqueen.MotorRun(maqueen.aMotors.M1, maqueen.Dir.CCW, 255)
    maqueen.MotorRun(maqueen.aMotors.M2, maqueen.Dir.CCW, 255)
    basic.pause(2000)
    maqueen.motorStopAll()
}
function PUSHA_CHECCO () {
    maqueen.MotorRun(maqueen.aMotors.M1, maqueen.Dir.CW, 255)
    maqueen.MotorRun(maqueen.aMotors.M2, maqueen.Dir.CW, 255)
    pushing = true
    while (pushing) {
        if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 1 || maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 1) {
            maqueen.motorStopAll()
            pushing = false
        }
    }
}
function CERCA () {
    maqueen.MotorRun(maqueen.aMotors.M1, maqueen.Dir.CW, 150)
    maqueen.MotorRun(maqueen.aMotors.M2, maqueen.Dir.CCW, 150)
    counter = 0
    searching = true
    basic.pause(500)
    while (searching) {
        distance = maqueen.sensor(PingUnit.MicroSeconds)
        if (distance > 0 && distance < 950) {
            maqueen.motorStopAll()
            maqueen.MotorRun(maqueen.aMotors.M1, maqueen.Dir.CCW, 100)
            basic.pause(200)
            maqueen.motorStop(maqueen.aMotors.M1)
            found = true
            searching = false
        }
        if (counter > 50) {
            maqueen.motorStopAll()
            found = false
            searching = false
        }
        counter += 1
    }
}
let distance = 0
let searching = false
let counter = 0
let pushing = false
let found = false
basic.showIcon(IconNames.Skull)
let active = true
while (active) {
    found = false
    CERCA()
    if (found) {
        PUSHA_CHECCO()
        INDIETRO()
    } else {
        active = false
    }
}
