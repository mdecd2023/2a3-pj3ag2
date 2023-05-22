    # pip install pyzmq cbor keyboard
#from zmqRemoteApi import RemoteAPIClient
from zmqRemoteApi_IPv6 import RemoteAPIClient
import keyboard

client = RemoteAPIClient('127.0.0.1', 23000)

print('Program started')
sim = client.getObject('sim')
sim.startSimulation()
print('Simulation started')

def setBubbleRobVelocity(leftfrontWheelVelocity, rightfrontWheelVelocity,leftbackWheelVelocity,rightbackWheelVelocity):
    leftfrontMotor = sim.getObject('/LF')
    rightfrontMotor = sim.getObject('/RF')
    leftbackMotor = sim.getObject('/LB')
    rightbackMotor = sim.getObject('/RB')
    
    
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

while True:wds
    if keyboard.is_pressed('w'):
        setBubbleRobVelocity(1.0, 1.0,1.0, 1.0)
    elif keyboard.is_pressed('s'):
        setBubbleRobVelocity(-1.0, -1.0,-1.0, -1.0)
    elif keyboard.is_pressed('a'):
        setBubbleRobVelocity(-1.0, 1.0,-1.0, 1.0)
    elif keyboard.is_pressed('d'):
        setBubbleRobVelocity(1.0, -1.0,1.0, -1.0)
    elif keyboard.is_pressed('q'):
        # stop simulation
        sim.stopSimulation()
    else:
        setBubbleRobVelocity(0.0, 0.0,0.0, 0.0)




