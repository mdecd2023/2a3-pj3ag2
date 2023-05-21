# zmqRemoteApi_IPv6 為將 zmq 通訊協定修改為 IPv4 與 IPv6 相容
from zmqRemoteApi_IPv6 import RemoteAPIClient
import time
import math
import keyboard
print("a")
# 利用 zmqRemoteAPI 以 23000對場景伺服器進行連線
client = RemoteAPIClient('localhost', 23000)
# 以 getObject 方法取得場景物件
sim = client.getObject('sim')
box = sim.getObject('/box')
print("d")
joint1_handle = sim.getObject('/joint1')
joint2_handle = sim.getObject('/joint2')
joint3_handle = sim.getObject('/joint3')
joint4_handle = sim.getObject('/joint4')
# 啟動模擬
#sim.startSimulation()
# 加入按鍵狀態, 起始值為 false
key_pressed = False
counter = 0

while True:
    if keyboard.is_pressed('a'):
        if not key_pressed:
            # 當 i 鍵按下, 在按鍵狀態設為 True 之前, 執行預設流程
            print("a 鍵按下!")
            # 每按一次 i 順時鐘旋轉 36 度
            counter = counter + 1
            print(counter)
            # in radian
            target_angle = math.radians(-36)
            # in radian
            current_angle = sim.getJointPosition(joint1_handle)
            print(current_angle)
            new_angle = current_angle + target_angle
            sim.setJointTargetPosition(joint1_handle, new_angle)
            # 按鍵狀態設為 True
            key_pressed = True
    if keyboard.is_pressed('s'):
        if not key_pressed:
            # 當 i 鍵按下, 在按鍵狀態設為 True 之前, 執行預設流程
            print("s 鍵按下!")
            # 每按一次 i 順時鐘旋轉 36 度
            counter = counter + 1
            print(counter)
            # in radian
            target_angle = math.radians(-36)
            # in radian
            current_angle = sim.getJointPosition(joint2_handle)
            print(current_angle)
            new_angle = current_angle + target_angle
            sim.setJointTargetPosition(joint2_handle, new_angle)
            # 按鍵狀態設為 True
            key_pressed = True
    if keyboard.is_pressed('d'):
        if not key_pressed:
            # 當 i 鍵按下, 在按鍵狀態設為 True 之前, 執行預設流程
            print("s 鍵按下!")
            # 每按一次 i 順時鐘旋轉 36 度
            counter = counter + 1
            print(counter)
            # in radian
            target_angle = math.radians(-36)
            # in radian
            current_angle = sim.getJointPosition(joint3_handle)
            print(current_angle)
            new_angle = current_angle + target_angle
            sim.setJointTargetPosition(joint3_handle, new_angle)
            # 按鍵狀態設為 True
            key_pressed = True
    if keyboard.is_pressed('f'):
        if not key_pressed:
            # 當 i 鍵按下, 在按鍵狀態設為 True 之前, 執行預設流程
            print("s 鍵按下!")
            # 每按一次 i 順時鐘旋轉 36 度
            counter = counter + 1
            print(counter)
            # in radian
            target_angle = math.radians(-36)
            # in radian
            current_angle = sim.getJointPosition(joint4_handle)
            print(current_angle)
            new_angle = current_angle + target_angle
            sim.setJointTargetPosition(joint4_handle, new_angle)
            # 按鍵狀態設為 True
            key_pressed = True
    else:
        # 若未按鍵時狀態重設為 False
        key_pressed = False
    if keyboard.is_pressed('q'):
        # 按下 q 可以跳出重複迴圈
        break
    # 暫停 0.01 秒
    time.sleep(0.01)