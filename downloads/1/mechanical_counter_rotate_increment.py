# zmqRemoteApi_IPv6 為將 zmq 通訊協定修改為 IPv4 與 IPv6 相容
from zmqRemoteApi_IPv6 import RemoteAPIClient
import time
import math
import keyboard

# 利用 zmqRemoteAPI 以 23000 對場景伺服器進行連線
client = RemoteAPIClient('localhost', 23000)
# 以 getObject 方法取得場景物件
sim = client.getObject('sim')
box = sim.getObject('/box')

# 啟動模擬
#sim.startSimulation()
# 建立尺寸數列, 分別定義 x, y, z 方向尺寸
x = 0.2
y = 0.2
z = 0.1
size = [x, y, z]

# 利用 size 數列, 建立圓柱物件, 2 代表 cylinder
# 8 表示 respondable, 1 為 質量
digit1_handle = sim.createPureShape(2, 8, size, 1, None)
# 將圓柱物件命名為 digit1, 若用於機械計分可做為個位數轉盤
# 之後可再導入帶有數字組立的外型零件
sim.setObjectAlias(digit1_handle, 'digit1')
# 轉角單位為徑度
sim.setObjectOrientation(digit1_handle, -1, [0, math.pi/2, 0])
# 起始物件中心位於 [0, 0, 0], 為了位於地板, 往 z 提升半徑高度
sim.setObjectPosition(digit1_handle, -1, [0, 0, x/2])

# 建立 revolute joint 命名為 joint, 且將 joint mode 設為 dynamic, control mode 設為 position
joint1_handle = sim.createJoint(sim.joint_revolute_subtype, sim.jointmode_dynamic, 0, None)
sim.setObjectInt32Param(joint1_handle, sim.jointintparam_dynctrlmode, sim.jointdynctrl_position)
sim.setObjectAlias(joint1_handle, 'joint1')
# https://mde.tw/pjcopsim/content/objectParameterIDs.html
# sim.jointintparam_dynposctrltype
# int32 parameter: the dynamic position control type of the joint: 0=PID, 1=motion profile
# 將 joint1 參數 sim.jointintparam_dynposctrltype 設為 1 表示在 dynamic mode 中使用 position control mode
# 且啟用 motion profile control
sim.setObjectInt32Param(joint1_handle, sim.jointintparam_dynposctrltype, 1)


# 取得 cylinder 的位置座標
digit1_pos = sim.getObjectPosition(digit1_handle, -1)
# 將 joint1 位置與 digit1 位置重合
joint1_pos = [digit1_pos[0], digit1_pos[1], digit1_pos[2]]

# 將 joint1 至於 cylinder 中心
sim.setObjectPosition(joint1_handle, -1, joint1_pos)
# 取得 digit1_handle 的方位
digit1_ori = sim.getObjectOrientation(digit1_handle, -1)
# 將 joint1_handle 方位與 digit1 對齊
sim.setObjectOrientation(joint1_handle, -1, digit1_ori)

# 將 joint1 置於 box 上
sim.setObjectParent(joint1_handle, box, True)
# 將 cylinder 置於 joint1 上
sim.setObjectParent(digit1_handle, joint1_handle, True)

# 鎖定 joint1
sim.setJointForce(joint1_handle, float('inf'))

print("基本場景建立完成!")

# 重複執行迴圈
while True:
    if keyboard.is_pressed('i'):
        # 每按一次 i, 就會轉動 -36 度, 且轉為徑度
        target_angle = math.radians(-36)
        current_angle = sim.getJointPosition(joint1_handle)
        new_angle = current_angle + target_angle
        sim.setJointTargetPosition(joint1_handle, new_angle)

    if keyboard.is_pressed('q'):
        # 按下 q 則會跳出迴圈
        break

    # 暫停 0.01 秒
    time.sleep(0.01)

# 停止模擬
#sim.stopSimulation()
