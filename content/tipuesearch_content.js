var tipuesearch = {"pages": [{'title': 'About', 'text': '成員:41023106、41023113、41023125、41023153、 41023103、41023116、41023132、41023151 \n 3ag2倉儲:  https://github.com/mdecd2023/2a2-pj3ag2.git \xa0 \n \n 3ag2網站:  https://mdecd2023.github.io/2a2-pj3ag2 \xa0\xa0 \n \n \n \n \n', 'tags': '', 'url': 'About.html'}, {'title': 'pj3', 'text': '\n 分配表 \n 1.球場繪製:41023106 \n 2.球員繪製:4102313 \n 3.記分板繪製:41023153 \n 4.程式:41023125 \n \n 場景模擬 \n \n /downloads/總和球場.ttt \n \n 球員場景建立 \n 使用onshape繪製球員，後匯入Coppeliasim進行爆炸拆件，拆件後加入joint並且將物件改為實體。 \n 圖檔匯入 Coppeliasim步驟:  File-Import-Mseh -選擇圖檔匯入 \n 爆炸拆件:右鍵點選本體- Edit-Grouping/Merging-Divide seleceted shapes \n 將物件改為實體: 點選本體旁圖示-Show dynamic properties dialog-勾選Body is respondable以及Body is dynamic \n 加入joint:滑鼠右鍵- Add-Joint-Revolute \n \n 做動影片   \n 開會紀錄: \n 討論分工及場景建置 \n 協同工作並一起解決問題。 \n 由於尺寸錯誤，因此縮小比例製作了第二版。 \n CAR2.ttt \n \n \n \n \n \n \n \n \n \n \n \n /downloads/1.ttt \n 計分器 \n \n \n /downloads/計分.ttt \n \n /downloads/球場.ttt', 'tags': '', 'url': 'pj3.html'}, {'title': '程式', 'text': "記分板測試 \n local joints = {{},{},{},{}}\nlocal angle = {0,0,0,0}\nfunction sysCall_init()\n    -- do some initialization here\n      for i = 1, 4 do\n        joint = sim.getObject('/joint' .. i)\n        joints[i] = joint\n        --print(joints)\n    end\nend\n\nfunction sysCall_actuation()\n    -- put your actuation code here\n    for i = 1, 4 do\n    sim.setJointTargetPosition(joints[i], angle[i])\n    a = angle[i]\n    angle[i] = a + 36\n    end \n    \n    \nend\n\nfunction sysCall_sensing()\n    -- put your sensing code here\n    --\nend\n\nfunction sysCall_cleanup()\n    -- do some clean-up here\nend\n\n-- See the user manual or the available code snippets for additional callback functions and details\n \n \n", 'tags': '', 'url': '程式.html'}]};