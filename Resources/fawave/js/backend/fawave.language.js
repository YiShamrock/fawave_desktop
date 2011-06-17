/*****
* FaWave
*/
window.FaWave = window.FaWave || {};

/*****
* i18n
*/
FaWave.i18n = FaWave.i18n || {};

/**
 * Default language code
 */
FaWave.i18n.defaultLanCode = 'zh-cn';

/**
 * �����ļ�Ŀ¼
 */
FaWave.i18n.__defineGetter__('languageDir', function(){
    return Titanium.Filesystem.getResourcesDirectory() + "/_locales";
});

/**
 * Load language
 * ϵͳ�����ж����ڵ��õ�ʱ���жϣ������������
 * @code: language code
 */
FaWave.i18n.load = function(code){
	// Load the language code
    //if(!code){
	//    code = navigator.language.toLowerCase(); // e.g. zh-cn or en
    //    code = FaWave.Setting.getValue('language', code);
    //}
    code = code.toLowerCase();
    try{
        // Load the default language file
        if(!FaWave.i18n.default){
            var file                = Titanium.Filesystem.getFile(FaWave.i18n.languageDir, FaWave.i18n.defaultLanCode + '.json');
            FaWave.i18n.default    = JSON.parse(file.read());
        }
        
        if (FaWave.i18n.code != FaWave.i18n.defaultLanCode)
        {
            file = Titanium.Filesystem.getFile(FaWave.i18n.languageDir, FaWave.i18n.code + '.json');
            if(file.exists()){
                FaWave.i18n.translation = JSON.parse(file.read());
            }else{
                code = code[0] + code[1]; // e.g. zh-cn => zh
                if(FaWave.i18n.code != code){
                    file = Titanium.Filesystem.getFile(FaWave.i18n.languageDir, FaWave.i18n.code + '.json');
                    if(file.exists()){
                        FaWave.i18n.translation = JSON.parse(file.read());
                    }else{
                        // ֱ����ΪĬ��
                        FaWave.i18n.code = FaWave.i18n.defaultLanCode;
                    }
                }
            }
        }else{
            FaWave.i18n.translation = {};
        }
    }catch(e){
        FaWave.Log.error(e);
        return false;
    }
    return true;
};

/**
 * ��ȡ������ֵ
 *
 */
FaWave.i18n.getString = function(key, defaultVal){
    return FaWave.i18n.translation[key] || FaWave.i18n.default || defaultVal || '';
}

/**
 * ֧�ֵ������б�
 * @result: e.g. [ ['en', 'English'], ['zh_cn', '��������'] ]
 */
FaWave.i18n.languageList = function(){
    var result = [],
        dir = Titanium.Filesystem.getFile(FaWave.i18n.languageDir);
    if(!dir.isDirectory()){
        return [];
    }
    var subDir = null,
        file = null,
        data = null,
        subDirs = dir.getDirectoryListing();
    for(var i=0; i < subDirs.length; i++){
        subDir = subDirs[i];
        if(subDir.isDirectory()){
            file = Titanium.Filesystem.getFile(FaWave.i18n.languageDir, FaWave.i18n.code + '.json');
            if(file.exists()){
                try{
                    data = JSON.parse(file.read());
                    if(data.language && data.language.message){
                        result.push([subDir.name(), data.language.message]);
                    }
                }catch(e){
                }
            }
        }
    }
    return result;
}