var tipuesearch = {"pages": [{'title': 'About', 'text': '成員:41023106、41023113、41023125、41023153、 41023103、41023116、41023132、41023151 \n 3ag2倉儲:  https://github.com/mdecd2023/2a3-pj3ag2 \xa0 \n \n 3ag2網站:  https://mdecd2023.github.io/2a3-pj3ag2 \xa0\xa0 \n \n \n \n', 'tags': '', 'url': 'About.html'}, {'title': 'pj3', 'text': "\n 分配表 \n 1.球場繪製:41023106 \n 2.球員繪製、感測器建立':4102313 \n 3.記分板繪製:41023153 \n 4.自動控制程式:41023125 \n \n 場景模擬 \n \n \n /downloads/總和球場.ttt \n \n 球員場景建立 \n 使用onshape繪製球員，後匯入Coppeliasim進行爆炸拆件，拆件後加入joint並且將物件改為實體。 \n 圖檔匯入 Coppeliasim步驟:  File-Import-Mseh -選擇圖檔匯入 \n 爆炸拆件:右鍵點選本體- Edit-Grouping/Merging-Divide seleceted shapes \n 將物件改為實體: 點選本體旁圖示-Show dynamic properties dialog-勾選Body is respondable以及Body is dynamic \n 加入joint:滑鼠右鍵- Add-Joint-Revolute \n \n 做動影片   \n 開會紀錄: \n 討論分工及場景建置 \n 協同工作並一起解決問題。 \n 由於尺寸錯誤，因此縮小比例製作了第二版。 \n CAR2.ttt \n \n \n \n \n \n \n \n \n \n \n \n /downloads/1.ttt \n 計分器 \n \n \n /downloads/計分.ttt \n 球場 \n /downloads/pj3球場.SLDPRT \n /downloads/pj3球場.STL \n \n \n \n 改版 \n pj3球場v2 \n pj3球場v2. \xa0 \n \n \n /downloads/球場.ttt \n 加入計時器 \n \n \n 計時器模擬影片 \n", 'tags': '', 'url': 'pj3.html'}, {'title': '程式', 'text': '記分板測試 \n local joints = {{},{},{},{}}\nlocal angle = {0,0,0,0}\nfunction sysCall_init()\n    -- do some initialization here\n      for i = 1, 4 do\n        joint = sim.getObject(\'/joint\' .. i)\n        joints[i] = joint\n        --print(joints)\n    end\nend\n\nfunction sysCall_actuation()\n    -- put your actuation code here\n    for i = 1, 4 do\n    sim.setJointTargetPosition(joints[i], angle[i])\n    a = angle[i]\n    angle[i] = a + 36\n    end \n    \n    \nend\n\nfunction sysCall_sensing()\n    -- put your sensing code here\n    --\nend\n\nfunction sysCall_cleanup()\n    -- do some clean-up here\nend\n\n-- See the user manual or the available code snippets for additional callback functions and details\n \n \n 記分板連動 \n local joints = {{},{},{},{}}\nlocal sensors = {{},{},{},{},{},{}}\nlocal socoresensors = {{},{}}\nlocal angle = {0,0,0,0}\nlocal initPosition = {}\nlocal initPosition = {}\nfunction regress()\n    --sim.pauseSimulation()\n    --sim.setObjectPosition(bubbleRobBase, -1, initialBubbleRobPosition)\n    --sim.setObjectOrientation(bubbleRobBase, -1, initialBubbleRobOrientation)\n    sim.setObjectPosition(ball, -1, initPosition)\n    sim.setObjectOrientation(ball, -1, initPosition)\n    --sim.setObjectPosition(23, -1, initia)\n    --sim.setObjectOrientation(23, -1, initial)\nend\nfunction sysCall_init()\n    -- do some initialization here\n    for i = 1, 4 do\n        joint = sim.getObject(\'/box/joint\' .. i)\n\n        joints[i] = joint\n        --print(joints)\n    end\n    for i = 0, 5 do\n        sensor =  sim.getObject(\'/Proximity_sensor[\' .. i ..\']\')\n        sensors[i+1] = sensor\n    end\n    --print(sensors)\n    for i = 0, 1 do\n        socoresensor =  sim.getObject(\'/Shape[0]/Proximity_sensor[\' .. i ..\']\')\n        socoresensors[i+1] = socoresensor\n    end\n    ball = sim.getObject(\'/Capsule\')\n    initPosition = sim.getObjectPosition(ball, -1)\n    initialballOrientation = sim.getObjectOrientation(ball, -1)\n    print(initPosition)\nend\n \nfunction sysCall_actuation()\n    -- put your actuation code here\n    \n    for i = 0, 5 do\n        result=sim.readProximitySensor(sensors[i+1])\n        --result=sim.readProximitySensor(sensors[1])\n        if(result>0)then\n            sim.stopSimulation()\n        end\n        --print(result)\n    end\n    scoreresult1=sim.readProximitySensor(socoresensors[1])\n    if(scoreresult1>0) then\n        angle[3] = angle[3] + 1 \n        if angle[3] == 10 then\n            angle[3] = 0 \n            angle[4] = angle[4] + 1\n        end\n        --sim.stopSimulation()\n        regress()\n    end\n    scoreresult2=sim.readProximitySensor(socoresensors[2])\n    if(scoreresult2>0)then\n        angle[1] = angle[1] + 1 \n        if angle[1] == 10 then\n            angle[1] = 0 \n            angle[2] = angle[2] + 1\n        end\n        --sim.stopSimulation()\n        regress()\n\n    end\n    for i = 1, 4 do\n        sim.setJointTargetPosition(joints[i], angle[i]*-0.62)\n        --a = angle[i]\n        --angle[i] = a + 1\n    end \n end\n \n \n 記分板程式整理 \n local joints = {{},{},{},{}}\nlocal sensors = {{},{},{},{},{},{}}\nlocal socoresensors = {{},{}}\nlocal angle = {0,0,0,0}\nlocal initPosition = {}\nlocal initOrientation = {}\nfunction regress(team)\n    --sim.pauseSimulation()\n    sim.setObjectPosition(ball, -1, initPosition)\n    sim.setObjectOrientation(ball, -1, initOrientation)\n    angle[team+1] = angle[team+1] + 1 \n    if angle[team+1] == 10 and team == 2 or 0 then\n        angle[team+1] = 0 \n        angle[team+2] = angle[team+2] + 1\n    end\nend\nfunction sysCall_init()\n    for i = 1, 4 do\n        joint = sim.getObject(\'/box/joint\' .. i)\n        joints[i] = joint\n    end\n    for i = 0, 5 do\n        sensor =  sim.getObject(\'/Proximity_sensor[\' .. i ..\']\')\n        sensors[i+1] = sensor\n    end\n    for i = 0, 1 do\n        socoresensor =  sim.getObject(\'/Shape[0]/Proximity_sensor[\' .. i ..\']\')\n        socoresensors[i+1] = socoresensor\n    end\n    ball = sim.getObject(\'/Capsule\')\n    initPosition = sim.getObjectPosition(ball, -1)\n    initOrientation = sim.getObjectOrientation(ball, -1)\n    print(initPosition)\nend\n  \nfunction sysCall_actuation()\n    for i = 0, 5 do\n        result=sim.readProximitySensor(sensors[i+1])\n        if(result>0)then\n        end\n    end\n    scoreresult1=sim.readProximitySensor(socoresensors[1])\n    scoreresult2=sim.readProximitySensor(socoresensors[2])\n    if(scoreresult1>0) then\n        regress(0)\n    end\n    if(scoreresult2>0)then\n        regress(2)\n    end\n    for i = 1, 4 do\n        sim.setJointTargetPosition(joints[i], angle[i]*-0.62)\n    end \n end \n \n \n BubbleRob觸發感測器歸位 \n local joints = {{},{},{},{}}\nlocal sensors = {{},{},{},{},{},{}}\nlocal socoresensors = {{},{}}\nlocal angle = {0,0,0,0}\nlocal initPosition = {}\nlocal initOrientation = {}\nlocal BubbleRobs = {}\nfunction regress(team)\n    --sim.pauseSimulation()\n    for i = 1,8 do\n        sim.setObjectPosition(BubbleRobs[i], -1, initPosition[i])\n        sim.setObjectOrientation(BubbleRobs[i], -1, initOrientation[i])\n    end\n    angle[team+1] = angle[team+1] + 1 \n    if angle[team+1] == 10  then\n        angle[team+1] = 0 \n        angle[team+2] = angle[team+2] + 1\n    end\nend\nfunction sysCall_init()\n    for i = 1, 4 do\n        joint = sim.getObject(\'/box/joint\' .. i)\n        joints[i] = joint\n    end\n    for i = 0, 5 do\n        sensor =  sim.getObject(\'/Proximity_sensor[\' .. i ..\']\')\n        sensors[i+1] = sensor\n    end\n    for i = 0, 1 do\n        socoresensor =  sim.getObject(\'/Shape[0]/Proximity_sensor[\' .. i ..\']\')\n        socoresensors[i+1] = socoresensor\n        \n    end\n    --ball = sim.getObject(\'/Capsule\')\n    --initPosition = sim.getObjectPosition(ball, -1)\n    --initOrientation = sim.getObjectOrientation(ball, -1)\n    for i = 1,8 do\n        BubbleRob = sim.getObject(\'/Shape[\'..i+2 .. \']\')\n        BubbleRobs[i] = BubbleRob\n        initPosition[i] = sim.getObjectPosition(BubbleRob, -1)\n        initOrientation[i] = sim.getObjectOrientation(BubbleRob, -1)\n    end\nend\n  \nfunction sysCall_actuation()\n    for i = 0, 5 do\n        result=sim.readProximitySensor(sensors[i+1])\n        if(result>0)then\n            for i = 1,8 do\n                sim.setObjectPosition(BubbleRobs[i], -1, initPosition[i])\n                sim.setObjectOrientation(BubbleRobs[i], -1, initOrientation[i])\n            end\n        end\n    end\n    scoreresult1=sim.readProximitySensor(socoresensors[1])\n    scoreresult2=sim.readProximitySensor(socoresensors[2])\n    if(scoreresult1>0) then\n        regress(0)\n    end\n    if(scoreresult2>0)then\n        regress(2)\n    end\n    for i = 1, 4 do\n        sim.setJointTargetPosition(joints[i], angle[i]*-0.62)\n    end \n end \n ball隨機位置出現 \n local joints = {{},{},{},{}}\nlocal sensors = {{},{},{},{},{},{}}\nlocal socoresensors = {{},{}}\nlocal angle = {0,0,0,0}\nlocal initPosition = {}\nlocal initOrientation = {}\nlocal BubbleRobs = {}\nfunction randomNumber()\n    math.randomseed(os.time())\n    return {tonumber(math.random(-1, 1) .. \'.\' .. math.random(0,9)),tonumber(0 .. \'.\' .. math.random(0,9)),0.2}\nend\nfunction regress(team)\n    --sim.pauseSimulation()\n    for i = 1,8 do\n        sim.setObjectPosition(BubbleRobs[i], -1, initPosition[i])\n        sim.setObjectOrientation(BubbleRobs[i], -1, initOrientation[i])\n    end\n    sim.setObjectPosition(ball, -1, randomNumber())\n    angle[team+1] = angle[team+1] + 1 \n    if angle[team+1] == 10  then\n        angle[team+1] = 0 \n        angle[team+2] = angle[team+2] + 1\n    end\nend\nfunction sysCall_init()\n    ball = sim.getObject(\'/Capsule\')\n    for i = 1, 4 do\n        joint = sim.getObject(\'/box/joint\' .. i)\n        joints[i] = joint\n    end\n    for i = 0, 5 do\n        sensor =  sim.getObject(\'/Proximity_sensor[\' .. i ..\']\')\n        sensors[i+1] = sensor\n    end\n    for i = 0, 1 do\n        socoresensor =  sim.getObject(\'/Shape[0]/Proximity_sensor[\' .. i ..\']\')\n        socoresensors[i+1] = socoresensor\n        \n    end\n    for i = 1,8 do\n        BubbleRob = sim.getObject(\'/Shape[\'..i+2 .. \']\')\n        BubbleRobs[i] = BubbleRob\n        initPosition[i] = sim.getObjectPosition(BubbleRob, -1)\n        initOrientation[i] = sim.getObjectOrientation(BubbleRob, -1)\n    end\nend\n  \nfunction sysCall_actuation()\n    scoreresult1=sim.readProximitySensor(socoresensors[1])\n    scoreresult2=sim.readProximitySensor(socoresensors[2])\n    for i = 0, 5 do\n        result=sim.readProximitySensor(sensors[i+1])\n        if(result>0)then\n            for i = 1,8 do\n                sim.setObjectPosition(BubbleRobs[i], -1, initPosition[i])\n                sim.setObjectOrientation(BubbleRobs[i], -1, initOrientation[i])\n                sim.setObjectPosition(ball, -1, randomNumber())\n            end\n        end\n    end\n    if(scoreresult1>0) then\n        regress(0)\n    end\n    if(scoreresult2>0)then\n        regress(2)\n    end\n    for i = 1, 4 do\n        sim.setJointTargetPosition(joints[i], angle[i]*-0.62)\n    end \n end \n 加入LED記分板 \n local joints = {{},{},{},{}}\nlocal sensors = {{},{},{},{},{},{}}\nlocal socoresensors = {{},{}}\nlocal angle = {0,0,0,0}\nlocal initPosition = {}\nlocal initOrientation = {}\nlocal BubbleRobs = {}\nlocal handles = {{},{},{},{}}\nlocal serialNumber = {\'a\',\'b\',\'c\',\'d\',\'e\',\'f\',\'g\'}\nlocal colors = {{1,0.09,1},{0,0,1},{0,1,1}}\nlocal specialNumbers = {{2, 3},{1,2,4,5,7},{1,2,3,4,7},{2,3,6,7},{1,3,4,6,7},{1,3,4,5,6,7},{1,2,3,6},{1,2,3,4,5,6,7},{1,2,3,4,6,7}}\nspecialNumbers[0] = {1,2,3,4,5,6}\nfunction Number(displayNumber,ser,color)\n    for i = 1, 7 do\n        for j = 1, #specialNumbers[ser] do\n            if i == specialNumbers[ser][j] then\n                sim.setShapeColor(handles[displayNumber][i], nil, sim.colorcomponent_ambient_diffuse, colors[color])\n                break\n            end\n        end\n    end\nend\nfunction scoreboard(number)\n    local numberString = tostring(number)\n    if #numberString < 2 then\n        numberString = \'0\' .. numberString\n    end\n    local tensDigit = tonumber(numberString:sub(1, 1))\n    local onesDigit = tonumber(numberString:sub(2, 2))\n    return{tensDigit,onesDigit}\nend\nfunction Toclear()\n    for i = 1, 7 do\n        for x = 1, 4 do\n            handle = handles[x][i]\n            sim.setShapeColor(handle, nil, sim.colorcomponent_ambient_diffuse, colors[3])\n        end\n    end\nend\nfunction randomNumber()\n    math.randomseed(os.time())\n    return {tonumber(math.random(-1, 1) .. \'.\' .. math.random(0,9)),tonumber(0 .. \'.\' .. math.random(0,9)),0.2}\nend\nfunction regress(team)\n    --sim.pauseSimulation()\n    for i = 1,8 do\n        sim.setObjectPosition(BubbleRobs[i], -1, initPosition[i])\n        sim.setObjectOrientation(BubbleRobs[i], -1, initOrientation[i])\n    end\n    sim.setObjectPosition(ball, -1, randomNumber())\n    angle[team+1] = angle[team+1] + 1 \n    if angle[team+1] == 10  then\n        angle[team+1] = 0 \n        angle[team+2] = angle[team+2] + 1\n    end\nend\nfunction sysCall_init()\n    score1 = 0\n    score2 = 0 \n    ball = sim.getObject(\'/Capsule\')\n    for i = 1, 4 do\n        joint = sim.getObject(\'/box/joint\' .. i)\n        joints[i] = joint\n    end\n    for i = 0, 5 do\n        sensor =  sim.getObject(\'/Proximity_sensor[\' .. i ..\']\')\n        sensors[i+1] = sensor\n    end\n    for i = 0, 1 do\n        socoresensor =  sim.getObject(\'/Shape[0]/Proximity_sensor[\' .. i ..\']\')\n        socoresensors[i+1] = socoresensor\n        \n    end\n    for i = 1,8 do\n        BubbleRob = sim.getObject(\'/Shape[\'..i+2 .. \']\')\n        BubbleRobs[i] = BubbleRob\n        initPosition[i] = sim.getObjectPosition(BubbleRob, -1)\n        initOrientation[i] = sim.getObjectOrientation(BubbleRob, -1)\n    end\n    for i = 1, 7 do\n        for x = 1, 4 do\n            ii = tostring(x) .. serialNumber[i]\n            local handle = sim.getObjectHandle("/scoreboard/".. ii )\n            handles[x][i] = handle\n        end\n    end\nend\n  \nfunction sysCall_actuation()\n    scoreresult1=sim.readProximitySensor(socoresensors[1])\n    scoreresult2=sim.readProximitySensor(socoresensors[2])\n    for i = 0, 5 do\n        result=sim.readProximitySensor(sensors[i+1])\n        if(result>0)then\n            for i = 1,8 do\n                sim.setObjectPosition(BubbleRobs[i], -1, initPosition[i])\n                sim.setObjectOrientation(BubbleRobs[i], -1, initOrientation[i])\n                sim.setObjectPosition(ball, -1, randomNumber())\n            end\n        end\n    end\n    if(scoreresult1>0) then\n        regress(0)\n        score2 = score2+1\n    end\n    if(scoreresult2>0)then\n        regress(2)\n        score1 = score1+1\n    end\n    for i = 1, 4 do\n        sim.setJointTargetPosition(joints[i], angle[i]*-0.62)\n    end \n    pink = scoreboard(score1)\n    blue = scoreboard(score2)\n    Toclear()\n    for i = 1, 2 do\n        Number(i,pink[i],1)\n        --Number(i,0)\n        Number(i+2,blue[i],2)\n    end\n end\n function sysCall_cleanup()\n    Toclear()\nend \n 加入計時器 \n local joints = {{},{},{},{}}\nlocal sensors = {{},{},{},{},{},{}}\nlocal socoresensors = {{},{}}\nlocal angle = {0,0,0,0}\nlocal initPosition = {}\nlocal initOrientation = {}\nlocal BubbleRobs = {}\nlocal handles = {{},{},{},{}}\nlocal serialNumber = {\'a\',\'b\',\'c\',\'d\',\'e\',\'f\',\'g\'}\nlocal colors = {{1,0.09,1},{0,0,1},{0,1,1}}\nlocal specialNumbers = {{2, 3},{1,2,4,5,7},{1,2,3,4,7},{2,3,6,7},{1,3,4,6,7},{1,3,4,5,6,7},{1,2,3,6},{1,2,3,4,5,6,7},{1,2,3,4,6,7}}\nspecialNumbers[0] = {1,2,3,4,5,6}\nfunction Number(displayNumber,ser,color)\n    for i = 1, 7 do\n        for j = 1, #specialNumbers[ser] do\n            if i == specialNumbers[ser][j] then\n                sim.setShapeColor(handles[displayNumber][i], nil, sim.colorcomponent_ambient_diffuse, colors[color])\n                break\n            end\n        end\n    end\nend\nfunction scoreboard(number)\n    local numberString = tostring(number)\n    if #numberString < 2 then\n        numberString = \'0\' .. numberString\n    end\n    local tensDigit = tonumber(numberString:sub(1, 1))\n    local onesDigit = tonumber(numberString:sub(2, 2))\n    return{tensDigit,onesDigit}\nend\nfunction Toclear()\n    for i = 1, 7 do\n        for x = 1, 4 do\n            handle = handles[x][i]\n            sim.setShapeColor(handle, nil, sim.colorcomponent_ambient_diffuse, colors[3])\n        end\n    end\nend\nfunction randomNumber()\n    math.randomseed(os.time())\n    return {tonumber(math.random(-1, 1) .. \'.\' .. math.random(0,9)),tonumber(0 .. \'.\' .. math.random(0,9)),0.2}\nend\nfunction regress(team)\n    --sim.pauseSimulation()\n    for i = 1,8 do\n        sim.setObjectPosition(BubbleRobs[i], -1, initPosition[i])\n        sim.setObjectOrientation(BubbleRobs[i], -1, initOrientation[i])\n    end\n    sim.setObjectPosition(ball, -1, randomNumber())\n    angle[team+1] = angle[team+1] + 1 \n    if angle[team+1] == 10  then\n        angle[team+1] = 0 \n        angle[team+2] = angle[team+2] + 1\n    end\nend\nfunction sysCall_init()\n    count = 18000\n    score1 = 0\n    score2 = 0 \n    ball = sim.getObject(\'/Capsule\')\n    for i = 1, 4 do\n        joint = sim.getObject(\'/box/joint\' .. i)\n        joints[i] = joint\n    end\n    for i = 0, 5 do\n        sensor =  sim.getObject(\'/Proximity_sensor[\' .. i ..\']\')\n        sensors[i+1] = sensor\n    end\n    for i = 0, 1 do\n        socoresensor =  sim.getObject(\'/Shape[0]/Proximity_sensor[\' .. i ..\']\')\n        socoresensors[i+1] = socoresensor\n        \n    end\n    for i = 1,8 do\n        BubbleRob = sim.getObject(\'/Shape[\'..i+2 .. \']\')\n        BubbleRobs[i] = BubbleRob\n        initPosition[i] = sim.getObjectPosition(BubbleRob, -1)\n        initOrientation[i] = sim.getObjectOrientation(BubbleRob, -1)\n    end\n    for i = 1, 7 do\n        for x = 1, 4 do\n            ii = tostring(x) .. serialNumber[i]\n            local handle = sim.getObjectHandle("/scoreboard/".. ii )\n            handles[x][i] = handle\n        end\n    end\n    xml = [[\n        <ui closeable="false" resizeable="false" activate="false">\n            <label text="30:00" style="* {background-color: #F00; color: #FFF; font-size: 32px; font-weight: bold; padding: 4px; border-radius: 4px;}" id="10"/>>\n        </ui>\n    ]]\n    ui = simUI.create(xml)\n    simUI.setPosition(ui, 0,0, true)\nend\n  \nfunction sysCall_actuation()\n    scoreresult1=sim.readProximitySensor(socoresensors[1])\n    scoreresult2=sim.readProximitySensor(socoresensors[2])\n    for i = 0, 5 do\n        result=sim.readProximitySensor(sensors[i+1])\n        if(result>0)then\n            for i = 1,8 do\n                sim.setObjectPosition(BubbleRobs[i], -1, initPosition[i])\n                sim.setObjectOrientation(BubbleRobs[i], -1, initOrientation[i])\n                sim.setObjectPosition(ball, -1, randomNumber())\n            end\n        end\n    end\n    if(scoreresult1>0) then\n        regress(0)\n        score2 = score2+1\n    end\n    if(scoreresult2>0)then\n        regress(2)\n        score1 = score1+1\n    end\n    for i = 1, 4 do\n        sim.setJointTargetPosition(joints[i], angle[i]*-0.62)\n    end \n    pink = scoreboard(score1)\n    blue = scoreboard(score2)\n    Toclear()\n    for i = 1, 2 do\n        Number(i,pink[i],1)\n        --Number(i,0)\n        Number(i+2,blue[i],2)\n    end\n    if count > 0 then\n        count = count - 1\n        local minutes = math.floor(count / 60)\n        local seconds = count % 60\n        local timeStr = string.format("%d:%02d", minutes, seconds)\n        simUI.setLabelText(ui, 10, timeStr)\n    else\n        sim.stopSimulation()\n    end\nend\nfunction sysCall_cleanup()\n    Toclear()\nend \n 將計時與現實時間吻合 \n local joints = {{},{},{},{}}\nlocal sensors = {{},{},{},{},{},{}}\nlocal socoresensors = {{},{}}\nlocal angle = {0,0,0,0}\nlocal initPosition = {}\nlocal initOrientation = {}\nlocal BubbleRobs = {}\nlocal handles = {{},{},{},{}}\nlocal serialNumber = {\'a\',\'b\',\'c\',\'d\',\'e\',\'f\',\'g\'}\nlocal colors = {{1,0.09,1},{0,0,1},{0,1,1}}\nlocal specialNumbers = {{2, 3},{1,2,4,5,7},{1,2,3,4,7},{2,3,6,7},{1,3,4,6,7},{1,3,4,5,6,7},{1,2,3,6},{1,2,3,4,5,6,7},{1,2,3,4,6,7}}\nspecialNumbers[0] = {1,2,3,4,5,6}\nfunction Number(displayNumber,ser,color)\n    for i = 1, 7 do\n        for j = 1, #specialNumbers[ser] do\n            if i == specialNumbers[ser][j] then\n                sim.setShapeColor(handles[displayNumber][i], nil, sim.colorcomponent_ambient_diffuse, colors[color])\n                break\n            end\n        end\n    end\nend\nfunction scoreboard(number)\n    local numberString = tostring(number)\n    if #numberString < 2 then\n        numberString = \'0\' .. numberString\n    end\n    local tensDigit = tonumber(numberString:sub(1, 1))\n    local onesDigit = tonumber(numberString:sub(2, 2))\n    return{tensDigit,onesDigit}\nend\nfunction Toclear()\n    for i = 1, 7 do\n        for x = 1, 4 do\n            handle = handles[x][i]\n            sim.setShapeColor(handle, nil, sim.colorcomponent_ambient_diffuse, colors[3])\n        end\n    end\nend\nfunction randomNumber()\n    math.randomseed(os.time())\n    return {tonumber(math.random(-1, 1) .. \'.\' .. math.random(0,9)),tonumber(0 .. \'.\' .. math.random(0,9)),0.2}\nend\nfunction regress(team)\n    --sim.pauseSimulation()\n    for i = 1,8 do\n        sim.setObjectPosition(BubbleRobs[i], -1, initPosition[i])\n        sim.setObjectOrientation(BubbleRobs[i], -1, initOrientation[i])\n    end\n    sim.setObjectPosition(ball, -1, randomNumber())\n    angle[team+1] = angle[team+1] + 1 \n    if angle[team+1] == 10  then\n        angle[team+1] = 0 \n        angle[team+2] = angle[team+2] + 1\n    end\nend\nfunction sysCall_init()\n    count = 300\n    score1 = 0\n    score2 = 0 \n    timer = 0\n    deltaTime = sim.getSimulationTimeStep()\n    print(deltaTime)\n    ball = sim.getObject(\'/Capsule\')\n    for i = 1, 4 do\n        joint = sim.getObject(\'/box/joint\' .. i)\n        joints[i] = joint\n    end\n    for i = 0, 5 do\n        sensor =  sim.getObject(\'/Proximity_sensor[\' .. i ..\']\')\n        sensors[i+1] = sensor\n    end\n    for i = 0, 1 do\n        socoresensor =  sim.getObject(\'/Shape[0]/Proximity_sensor[\' .. i ..\']\')\n        socoresensors[i+1] = socoresensor\n        \n    end\n    for i = 1,8 do\n        BubbleRob = sim.getObject(\'/Shape[\'..i+2 .. \']\')\n        BubbleRobs[i] = BubbleRob\n        initPosition[i] = sim.getObjectPosition(BubbleRob, -1)\n        initOrientation[i] = sim.getObjectOrientation(BubbleRob, -1)\n    end\n    for i = 1, 7 do\n        for x = 1, 4 do\n            ii = tostring(x) .. serialNumber[i]\n            local handle = sim.getObjectHandle("/scoreboard/".. ii )\n            handles[x][i] = handle\n        end\n    end\n    xml = [[\n        <ui closeable="false" resizeable="false" activate="false">\n            <label text="5:00" style="* {background-color: #F00; color: #FFF; font-size: 32px; font-weight: bold; padding: 4px; border-radius: 4px;}" id="10"/>>\n        </ui>\n    ]]\n    ui = simUI.create(xml)\n    simUI.setPosition(ui, 0,0, true)\nend\n  \nfunction sysCall_actuation()\n    timer = timer + deltaTime\n    scoreresult1=sim.readProximitySensor(socoresensors[1])\n    scoreresult2=sim.readProximitySensor(socoresensors[2])\n    for i = 0, 5 do\n        result=sim.readProximitySensor(sensors[i+1])\n        if(result>0)then\n            for i = 1,8 do\n                sim.setObjectPosition(BubbleRobs[i], -1, initPosition[i])\n                sim.setObjectOrientation(BubbleRobs[i], -1, initOrientation[i])\n                sim.setObjectPosition(ball, -1, randomNumber())\n            end\n        end\n    end\n    if(scoreresult1>0) then\n        regress(0)\n        score2 = score2+1\n    end\n    if(scoreresult2>0)then\n        regress(2)\n        score1 = score1+1\n    end\n    for i = 1, 4 do\n        sim.setJointTargetPosition(joints[i], angle[i]*-0.62)\n    end \n    pink = scoreboard(score1)\n    blue = scoreboard(score2)\n    Toclear()\n    for i = 1, 2 do\n        Number(i,pink[i],1)\n        --Number(i,0)\n        Number(i+2,blue[i],2)\n    end\n    if count > 0 then\n        if timer >= 1 then\n            timer = 0\n            count = count - 1\n            local minutes = math.floor(count / 60)\n            local seconds = count % 60\n            local timeStr = string.format("%d:%02d", minutes, seconds)\n            simUI.setLabelText(ui, 10, timeStr)\n        end\n    else\n        sim.stopSimulation()\n    end\nend\nfunction sysCall_cleanup()\n    Toclear()\nend \n 加入計時板 \n local joints = {{},{},{},{}}\nlocal sensors = {{},{},{},{},{},{}}\nlocal socoresensors = {{},{}}\nlocal angle = {0,0,0,0}\nlocal initPosition = {}\nlocal initOrientation = {}\nlocal BubbleRobs = {}\nlocal handles = {{},{},{},{}}\nlocal timehandles = {{},{},{},{}}\nlocal serialNumber = {\'a\',\'b\',\'c\',\'d\',\'e\',\'f\',\'g\'}\nlocal colors = {{1,0.09,1},{0,0,1},{0,1,1},{0,0,0}}\nlocal specialNumbers = {{2, 3},{1,2,4,5,7},{1,2,3,4,7},{2,3,6,7},{1,3,4,6,7},{1,3,4,5,6,7},{1,2,3,6},{1,2,3,4,5,6,7},{1,2,3,4,6,7}}\nspecialNumbers[0] = {1,2,3,4,5,6}\nlocal timesseconds = {0,0}\nlocal timesminutes = {0,5}\nfunction Number(displayNumber,ser,color)\n    for i = 1, 7 do\n        for j = 1, #specialNumbers[ser] do\n            if i == specialNumbers[ser][j] then\n                sim.setShapeColor(handles[displayNumber][i], nil, sim.colorcomponent_ambient_diffuse, colors[color])\n                break\n            end\n        end\n    end\nend\nfunction timeNumber(displayNumber,ser)\n    for i = 1, 7 do\n        for j = 1, #specialNumbers[ser] do\n            if i == specialNumbers[ser][j] then\n                sim.setShapeColor(timehandles[displayNumber][i], nil, sim.colorcomponent_ambient_diffuse, colors[4])\n                break\n            end\n        end\n    end\nend\nfunction scoreboard(number)\n    local numberString = tostring(number)\n    if #numberString < 2 then\n        numberString = \'0\' .. numberString\n    end\n    local tensDigit = tonumber(numberString:sub(1, 1))\n    local onesDigit = tonumber(numberString:sub(2, 2))\n    return{tensDigit,onesDigit}\nend\nfunction Toclear()\n    for i = 1, 7 do\n        for x = 1, 4 do\n            handle = handles[x][i]\n            sim.setShapeColor(handle, nil, sim.colorcomponent_ambient_diffuse, colors[3])\n            timehandle = timehandles[x][i]\n            sim.setShapeColor(timehandle, nil, sim.colorcomponent_ambient_diffuse, colors[3])\n        end\n    end\nend\nfunction randomNumber()\n    math.randomseed(os.time())\n    return {tonumber(math.random(-1, 1) .. \'.\' .. math.random(0,9)),tonumber(0 .. \'.\' .. math.random(0,9)),0.2}\nend\nfunction regress(team)\n    --sim.pauseSimulation()\n    for i = 1,8 do\n        sim.setObjectPosition(BubbleRobs[i], -1, initPosition[i])\n        sim.setObjectOrientation(BubbleRobs[i], -1, initOrientation[i])\n    end\n    sim.setObjectPosition(ball, -1, randomNumber())\n    angle[team+1] = angle[team+1] + 1 \n    if angle[team+1] == 10  then\n        angle[team+1] = 0 \n        angle[team+2] = angle[team+2] + 1\n    end\nend\nfunction sysCall_init()\n    count = 300\n    score1 = 0\n    score2 = 0 \n    timer = 0\n    deltaTime = sim.getSimulationTimeStep()\n    print(deltaTime)\n    ball = sim.getObject(\'/Capsule\')\n    for i = 1, 4 do\n        joint = sim.getObject(\'/box/joint\' .. i)\n        joints[i] = joint\n    end\n    for i = 0, 5 do\n        sensor =  sim.getObject(\'/Proximity_sensor[\' .. i ..\']\')\n        sensors[i+1] = sensor\n    end\n    for i = 0, 1 do\n        socoresensor =  sim.getObject(\'/Shape[0]/Proximity_sensor[\' .. i ..\']\')\n        socoresensors[i+1] = socoresensor\n        \n    end\n    for i = 1,8 do\n        BubbleRob = sim.getObject(\'/Shape[\'..i+2 .. \']\')\n        BubbleRobs[i] = BubbleRob\n        initPosition[i] = sim.getObjectPosition(BubbleRob, -1)\n        initOrientation[i] = sim.getObjectOrientation(BubbleRob, -1)\n    end\n    for i = 1, 7 do\n        for x = 1, 4 do\n            ii = tostring(x) .. serialNumber[i]\n            local handle = sim.getObjectHandle("/scoreboard/".. ii )\n            handles[x][i] = handle\n        end\n    end\n    for i = 1, 7 do\n        for x = 1, 4 do\n            ii = tostring(x) .. serialNumber[i]\n            local timehandle = sim.getObjectHandle("/time/".. ii )\n            timehandles[x][i] = timehandle\n        end\n    end\nend\n  \nfunction sysCall_actuation()\n    timer = timer + deltaTime\n    scoreresult1=sim.readProximitySensor(socoresensors[1])\n    scoreresult2=sim.readProximitySensor(socoresensors[2])\n    for i = 0, 5 do\n        result=sim.readProximitySensor(sensors[i+1])\n        if(result>0)then\n            for i = 1,8 do\n                sim.setObjectPosition(BubbleRobs[i], -1, initPosition[i])\n                sim.setObjectOrientation(BubbleRobs[i], -1, initOrientation[i])\n                sim.setObjectPosition(ball, -1, randomNumber())\n            end\n        end\n    end\n    if(scoreresult1>0) then\n        regress(0)\n        score2 = score2+1\n    end\n    if(scoreresult2>0)then\n        regress(2)\n        score1 = score1+1\n    end\n    for i = 1, 4 do\n        sim.setJointTargetPosition(joints[i], angle[i]*-0.62)\n    end \n    pink = scoreboard(score1)\n    blue = scoreboard(score2)\n    Toclear()\n    for i = 1, 2 do\n        Number(i,pink[i],1)\n        --Number(i,0)\n        Number(i+2,blue[i],2)\n    end\n    \n    if count > 0 then\n        if timer >= 1 then\n            timer = 0\n            count = count - 1\n            local minutes = math.floor(count / 60)\n            local seconds = count % 60\n            local timeStr = string.format("%d:%02d", minutes, seconds)\n            timesseconds = scoreboard(seconds)\n            timesminutes = scoreboard(minutes)\n            \n        end\n    else\n        sim.stopSimulation()\n    end\n    for i = 1,2 do\n            timeNumber(i,timesminutes[i])\n            timeNumber(i+2,timesseconds[i])\n    end\nend\nfunction sysCall_cleanup()\n    Toclear()\nend \n 添加計時器閃爍的dot \n local joints = {{},{},{},{}}\nlocal sensors = {{},{},{},{},{},{}}\nlocal socoresensors = {{},{}}\nlocal angle = {0,0,0,0}\nlocal initPosition = {}\nlocal initOrientation = {}\nlocal BubbleRobs = {}\nlocal handles = {{},{},{},{}}\nlocal timehandles = {{},{},{},{}}\nlocal serialNumber = {\'a\',\'b\',\'c\',\'d\',\'e\',\'f\',\'g\'}\nlocal colors = {{1,0.09,1},{0,0,1},{0,1,1},{0,0,0}}\nlocal specialNumbers = {{2, 3},{1,2,4,5,7},{1,2,3,4,7},{2,3,6,7},{1,3,4,6,7},{1,3,4,5,6,7},{1,2,3,6},{1,2,3,4,5,6,7},{1,2,3,4,6,7}}\nspecialNumbers[0] = {1,2,3,4,5,6}\nlocal timesseconds = {0,0}\nlocal timesminutes = {0,5}\nlocal dots = {{},{},{},{}}\nlocal dottime = 1\nfunction Number(displayNumber,ser,color)\n    for i = 1, 7 do\n        for j = 1, #specialNumbers[ser] do\n            if i == specialNumbers[ser][j] then\n                sim.setShapeColor(handles[displayNumber][i], nil, sim.colorcomponent_ambient_diffuse, colors[color])\n                break\n            end\n        end\n    end\nend\nfunction timeNumber(displayNumber,ser)\n    for i = 1, 7 do\n        for j = 1, #specialNumbers[ser] do\n            if i == specialNumbers[ser][j] then\n                sim.setShapeColor(timehandles[displayNumber][i], nil, sim.colorcomponent_ambient_diffuse, colors[4])\n                break\n            end\n        end\n    end\nend\nfunction scoreboard(number)\n    local numberString = tostring(number)\n    if #numberString < 2 then\n        numberString = \'0\' .. numberString\n    end\n    local tensDigit = tonumber(numberString:sub(1, 1))\n    local onesDigit = tonumber(numberString:sub(2, 2))\n    return{tensDigit,onesDigit}\nend\nfunction dotcolor(color)\n    for i = 1,2 do \n        dot = dots[i]  \n        sim.setShapeColor(dot, nil, sim.colorcomponent_ambient_diffuse, colors[color])\n    end \nend\nfunction Toclear()\n    for i = 1, 7 do\n        for x = 1, 4 do\n            handle = handles[x][i]\n            sim.setShapeColor(handle, nil, sim.colorcomponent_ambient_diffuse, colors[3])\n            timehandle = timehandles[x][i]\n            sim.setShapeColor(timehandle, nil, sim.colorcomponent_ambient_diffuse, colors[3])\n        end\n    end\nend\nfunction randomNumber()\n    math.randomseed(os.time())\n    return {tonumber(math.random(-1, 1) .. \'.\' .. math.random(0,9)),tonumber(0 .. \'.\' .. math.random(0,9)),0.2}\nend\nfunction regress(team)\n    --sim.pauseSimulation()\n    for i = 1,8 do\n        sim.setObjectPosition(BubbleRobs[i], -1, initPosition[i])\n        sim.setObjectOrientation(BubbleRobs[i], -1, initOrientation[i])\n    end\n    sim.setObjectPosition(ball, -1, randomNumber())\n    angle[team+1] = angle[team+1] + 1 \n    if angle[team+1] == 10  then\n        angle[team+1] = 0 \n        angle[team+2] = angle[team+2] + 1\n    end\nend\nfunction sysCall_init()\n    count = 300\n    score1 = 0\n    score2 = 0 \n    timer = 0\n    deltaTime = sim.getSimulationTimeStep()\n    print(deltaTime)\n    ball = sim.getObject(\'/Capsule\')\n    for i = 1, 4 do\n        joint = sim.getObject(\'/box/joint\' .. i)\n        joints[i] = joint\n    end\n    for i = 0, 5 do\n        sensor =  sim.getObject(\'/Proximity_sensor[\' .. i ..\']\')\n        sensors[i+1] = sensor\n    end\n    for i = 0, 1 do\n        socoresensor =  sim.getObject(\'/Shape[0]/Proximity_sensor[\' .. i ..\']\')\n        socoresensors[i+1] = socoresensor\n        \n    end\n    for i = 1,8 do\n        BubbleRob = sim.getObject(\'/Shape[\'..i+2 .. \']\')\n        BubbleRobs[i] = BubbleRob\n        initPosition[i] = sim.getObjectPosition(BubbleRob, -1)\n        initOrientation[i] = sim.getObjectOrientation(BubbleRob, -1)\n    end\n    for i = 1, 7 do\n        for x = 1, 4 do\n            ii = tostring(x) .. serialNumber[i]\n            local handle = sim.getObjectHandle("/scoreboard/".. ii )\n            handles[x][i] = handle\n        end\n    end\n    for i = 1, 7 do\n        for x = 1, 4 do\n            ii = tostring(x) .. serialNumber[i]\n            local timehandle = sim.getObjectHandle("/time/".. ii )\n            timehandles[x][i] = timehandle\n        end\n    end\n    for x = 0, 1 do\n            local dot = sim.getObjectHandle("/dot[".. x ..\']\')\n            dots[x+1] = dot\n    end\nend\n  \nfunction sysCall_actuation()\n    timer = timer + deltaTime\n    scoreresult1=sim.readProximitySensor(socoresensors[1])\n    scoreresult2=sim.readProximitySensor(socoresensors[2])\n    for i = 0, 5 do\n        result=sim.readProximitySensor(sensors[i+1])\n        if(result>0)then\n            for i = 1,8 do\n                sim.setObjectPosition(BubbleRobs[i], -1, initPosition[i])\n                sim.setObjectOrientation(BubbleRobs[i], -1, initOrientation[i])\n                sim.setObjectPosition(ball, -1, randomNumber())\n            end\n        end\n    end\n    if(scoreresult1>0) then\n        regress(0)\n        score2 = score2+1\n    end\n    if(scoreresult2>0)then\n        regress(2)\n        score1 = score1+1\n    end\n    for i = 1, 4 do\n        sim.setJointTargetPosition(joints[i], angle[i]*-0.62)\n    end \n    pink = scoreboard(score1)\n    blue = scoreboard(score2)\n    Toclear()\n    for i = 1, 2 do\n        Number(i,pink[i],1)\n        --Number(i,0)\n        Number(i+2,blue[i],2)\n    end\n    \n    if count > 0 then\n        if timer >= 1 then\n            timer = 0\n            count = count - 1\n            local minutes = math.floor(count / 60)\n            local seconds = count % 60\n            local timeStr = string.format("%d:%02d", minutes, seconds)\n            timesseconds = scoreboard(seconds)\n            timesminutes = scoreboard(minutes)\n            dottime = dottime+1\n        end\n        if  dottime >= 2 then\n            dottime = 0 \n        end\n    else\n        sim.stopSimulation()\n    end\n    for i = 1,2 do\n            timeNumber(i,timesminutes[i])\n            timeNumber(i+2,timesseconds[i])\n    end\n    dotcolor(dottime+3)\nend\nfunction sysCall_cleanup()\n    Toclear()\n    dotcolor(3)\nend \n', 'tags': '', 'url': '程式.html'}, {'title': '操控球員', 'text': "初版 \n # pip install pyzmq cbor keyboard\n#from zmqRemoteApi import RemoteAPIClient\nfrom zmqRemoteApi_IPv6 import RemoteAPIClient\nimport keyboard\nclient = RemoteAPIClient('127.0.0.1', 23000)\n\nprint('Program started')\nsim = client.getObject('sim')\nsim.startSimulation()\nprint('Simulation started')\n\ncar = 4\ndef setBubbleRobVelocity(leftfrontWheelVelocity, rightfrontWheelVelocity,leftbackWheelVelocity,rightbackWheelVelocity):\n    leftfrontMotor = sim.getObject('/Shape['+str(car)+']/LF')\n    rightfrontMotor = sim.getObject('/Shape['+str(car)+']/RF')\n    leftbackMotor = sim.getObject('/Shape['+str(car)+']/LB')\n    rightbackMotor = sim.getObject('/Shape['+str(car)+']/RB')\n    \n    \n    sim.setJointTargetVelocity(leftfrontMotor, leftfrontWheelVelocity)\n    sim.setJointTargetVelocity(rightfrontMotor, rightfrontWheelVelocity) \n    sim.setJointTargetVelocity(leftbackMotor, leftbackWheelVelocity)\n    sim.setJointTargetVelocity(rightbackMotor, rightbackWheelVelocity)\n\n'''\n# Example usage 1:\nsetBubbleRobVelocity(1.0, 1.0)\ntime.sleep(2)\nsetBubbleRobVelocity(0.0, 0.0)\n'''\n# use keyborad to move BubbleRob\nv  = 10.0\nwhile True:\n    if keyboard.is_pressed('w'):\n        setBubbleRobVelocity(v, v,v, v)\n    elif keyboard.is_pressed('s'):\n        setBubbleRobVelocity(-v, -v,-v, -v)\n    elif keyboard.is_pressed('a'):\n        setBubbleRobVelocity(-v, v,-v, v)\n    elif keyboard.is_pressed('d'):\n        setBubbleRobVelocity(v, -v,v, -v)\n    elif keyboard.is_pressed('q'):\n        # stop simulation\n        sim.stopSimulation()\n    else:\n        setBubbleRobVelocity(0.0, 0.0,0.0, 0.0)\n\n\n\n\n \n", 'tags': '', 'url': '操控球員.html'}]};