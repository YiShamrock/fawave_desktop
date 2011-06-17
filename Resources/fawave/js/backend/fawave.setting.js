window.FaWave = window.FaWave || {};
FaWave.Setting = {
    pathName: 'setting.json'
    defaults: {
        globalRefreshTime:{ //ȫ�ֵ�ˢ�¼��ʱ��
            friends_timeline: 90,
            mentions: 120,
            comments_timeline: 120,
            direct_messages: 120
        },
        isEnabledSound:{ //�Ƿ�������������ʾ����Ϣ
            friends_timeline: false,
            mentions: false,
            comments_timeline: false,
            direct_messages: false
        },
        soundSrc: '/sound/d.mp3',
        isDesktopNotifications:{ //�Ƿ���������ʾ����Ϣ
            friends_timeline: false,
            mentions: false,
            comments_timeline: false,
            direct_messages: false
        },
        desktopNotificationsTimeout: 5, //������ʾ���ӳٹر�ʱ��
        isSyncReadedToSina: false, //�Ѷ���Ϣ�Ƿ������΢��ҳ��ͬ��
        isSharedUrlAutoShort: true, //�������ڿ�����ַʱ�Ƿ��Զ�����
        sharedUrlAutoShortWordCount: 15, //�������ٸ������Զ�����URL
        quickSendHotKey: '113', //���ٷ���΢���Ŀ�ݼ���Ĭ�� F2������ĸ�ʽΪ�� 33,34,35 �ö��ŷָ���keycode
        isSmoothScroller: false, //�Ƿ�����ƽ������
        smoothTweenType: 'Quad', //ƽ�������Ķ�������
        smoothSeaeType: 'easeOut', //ƽ��������ease����
        sendAccountsDefaultSelected: 'current', //���˺ŷ��͵�ʱ��Ĭ��ѡ��ķ����˺�
        enableContextmenu: true, //�����Ҽ��˵�

        font: 'Arial', //����
        fontSite: 12, //�����С
        theme: 'pip_io', //������ʽ
        translate_target: 'zh', // Ĭ�Ϸ�������
        shorten_url_service: 't.cn', // Ĭ����ַ����
        image_service: 'Imgur', // Ĭ�ϵ�ͼƬ����
        enable_image_service: true, // Ĭ�Ͽ���ͼƬ����
        isGeoEnabled: false, //Ĭ�ϲ������ϱ�����λ����Ϣ
        isGeoEnabledUseIP: false, //true ʹ��ip�жϣ� false ʹ����������ж�
        geoPosition: null, //��ȡ���ĵ���λ����Ϣ��Ĭ��Ϊ��

        lookingTemplate: FaWave.i18n.getString('sett_shared_template')
    },
    init: function(){ //ֻ��background�����ʱ�����һ�β��� _settings ��ֵ�Ϳ���
        var path = Titanium.Filesystem.getResourcesDirectory();
        var file = Titanium.Filesystem.getFile(path, FaWave.Config.dataDir, FaWave.Setting.pathName);
        var _sets;
        if(file.exists()){
            try{
                _sets = JSON.parse(file.read());
            }catch(e){
                FaWave.Log.error(e);
            }
        }
        _sets = _sets || {};
        _sets = $.extend({}, this.defaults, _sets);

        return _sets;
    },
    get: function(){
        //�����жϣ���ȷ��init����background�����ʱ�����
        //if(!bg._settings){
        //    bg._settings = this.init();
        //}
        return FaWave.BG._settings;
    },
    /****
     * �����ļ�ϵͳ�쳣
     */
    save: function(){
        var _sets = this.get();
        var path = Titanium.Filesystem.getResourcesDirectory();
        var dir = Titanium.Filesystem.getFile(path, FaWave.Config.dataDir);
        if(!dir.exists()){
            dir.createDirectory();
        }
        var file = Titanium.Filesystem.getFile(path, FaWave.Config.dataDir, FaWave.Setting.pathName);
        // file.write���API������Titanium��1.1.0���ϰ汾�޸��ˣ�
        file.write(JSON.stringify(_sets));
    },
    /*
    * ��ȡˢ�¼��ʱ��
    */
    getRefreshTime: function(user, t){
        var r = 60;
        if(user && user.refreshTime && user.refreshTime[t]){
            r = user.refreshTime[t];
        }else{
            r = this.get().globalRefreshTime[t];
        }
        if(refreshTimeLimit[user.blogType] && refreshTimeLimit[user.blogType][t] && refreshTimeLimit[user.blogType][t] > r){
            r = refreshTimeLimit[user.blogType][t];
        }
        if(isNaN(r)){
            r = 60;
        }else if(r < 30){
            r = 30;
        }else if(r > 24 * 60 * 60){
            r = 24 * 60 * 60;
        }
        return r;
    }
};

