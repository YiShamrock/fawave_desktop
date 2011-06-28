window.FaWave = window.FaWave || {};

/****
 * �־û��洢
 */
FaWave.Store = {
    /****
     * �ļ��洢
     * �洢�� Resources Ŀ¼������Ŀ¼��
     */
    File: {
        read: function(fileName){
            var path = Titanium.Filesystem.getResourcesDirectory();
            var file = Titanium.Filesystem.getFile(path, FaWave.Config.dataDir, fileName);
            if(file.exists()){
                return file.read();
            }else{
                return '';
            }
        },
        save: function(fileName, value){
            var path = Titanium.Filesystem.getResourcesDirectory();
            var dir = Titanium.Filesystem.getFile(path, FaWave.Config.dataDir);
            if(!dir.exists()){
                dir.createDirectory();
            }
            var file = Titanium.Filesystem.getFile(path, FaWave.Config.dataDir, fileName);
            // file.write���API������Titanium��1.1.0���ϰ汾�޸��ˣ�
            file.write(value);
        },
        readAsJson: function(fileName){
            var _sets;
            try{
                _sets = JSON.parse(this.read(fileName));
            }catch(e){
                FaWave.Log.error(e);
            }
            return _sets || {};
        },
        saveAsJson: function(fileName, value){
            this.save(fileName, JSON.stringify(value));
        }
    },
    /******
     * ���ݿ�洢
     */
    DB: {}
};


// HTML5 localStorage �洢
// e.g. localStorage.setObject
Storage.prototype.setObject = function(key, value) {
    this.setItem(key, JSON.stringify(value));
};

Storage.prototype.getObject = function(key) {
    var v = this.getItem(key);
    if(v)
    {
        try{
            v = JSON.parse(v);
        }
        catch(err){
            v = null;
        }
    }
    return v;
};
