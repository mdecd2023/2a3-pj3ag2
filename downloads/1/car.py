# pip install pyzmq cbor keyboard
#from zmqRemoteApi import RemoteAPIClient
from zmqRemoteApi_IPv6 import RemoteAPIClient
import keyboard
client = RemoteAPIClient('127.0.0.1', 23000)

print('Program started')
sim = client.getObject('sim')
sim.startSimulation()
print('Simulation started')

car = 4
def setBubbleRobVelocity(leftfrontWheelVelocity, rightfrontWheelVelocity,leftbackWheelVelocity,rightbackWheelVelocity):
    leftfrontMotor = sim.getObject('/Shape['+str(car)+']/LF')
    rightfrontMotor = sim.getObject('/Shape['+str(car)+']/RF')
    leftbackMotor = sim.getObject('/Shape['+str(car)+']/LB')
    rightbackMotor = sim.getObject('/Shape['+str(car)+']/RB')
    
    
    sim.setJointTargetVelocity(leftfrontMotor, leftfrontWheelVelocity)
    sim.setJointTargetVelocity(rightfrontMotor, rightfrontWheelVelocity) 
    sim.setJointTargetVelocity(leftbackMotor, leftbackWheelVelocity)
    sim.setJointTargetVelocity(rightbackMotor, rightbackWheelVelocity)

'''
# Example usage 1:
setBubbleRobVelocity(1.0, 1.0)
time.sleep(2)
setBubbleRobVelocity(0.0, 0.0)
'''
# use keyborad to move BubbleRob
v  = 10.0
while True:
    if keyboard.is_pressed('w'):
        setBubbleRobVelocity(v, v,v, v)
    elif keyboard.is_pressed('s'):
        setBubbleRobVelocity(-v, -v,-v, -v)
    elif keyboard.is_pressed('a'):
        setBubbleRobVelocity(-v, v,-v, v)
    elif keyboard.is_pressed('d'):
        setBubbleRobVelocity(v, -v,v, -v)
    elif keyboard.is_pressed('q'):
        # stop simulation
        sim.stopSimulation()
    else:
        setBubbleRobVelocity(0.0, 0.0,0.0, 0.0)




