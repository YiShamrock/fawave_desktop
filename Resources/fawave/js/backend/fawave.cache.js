(function(){

window.FaWave = window.FaWave || {};

/*******
 * �ڴ滺��
 * ���ʣ�����ж�������أ��������ڼ����������Ƿ���Ҫһ���ڴ滺���������
 */
var MemoryCache = {
    // ��������
    _data: {},
    set: function(k, v){
        MemoryCache._data[k] = v;
    },
    get: function(k, _default){
        return MemoryCache._data[k] || _default;
    },
    remove: function(k){
        delete MemoryCache._data[k];
    }
};

/*******
 * win���ڻ���
 * ���浽��ǰ��window������
 * ע��ֻ�ǻ��浽��ǰwin���ڣ�����¿��Ĵ��ڣ����������ڵĻ��治һ����
 */
var WinCache = {
    set: function(k, v){
        WinCache._data[k] = v;
    },
    get: function(k, _default){
        return WinCache._data[k] || _default;
    },
    remove: function(k){
        delete WinCache._data[k];
    }
};
WinCache.__defineGetter__('_data', function(){
    Titanium.UI.currentWindow.winCache = Titanium.UI.currentWindow.winCache || {};
    return Titanium.UI.currentWindow.winCache;
});

/*******
 * Titanium Properties����
 */
var PropertiesCache = {
    set: function(k, v){
        Titanium.App.Properties.setString(k, JSON.stringify(v));
    },
    get: function(k, _default){
        var v;
        if(Titanium.App.Properties.hasProperty(k)){
            v = Titanium.App.Properties.getString(k);
        }
        if(v)
        {
            try{
                v = JSON.parse(v);
            }
            catch(err){
                v = null;
            }
        }
        return v || _default;
    },
    remove: function(k){
        Titanium.App.Properties.setString(k, '');
    }
};

/*******
 * ���������
 */
FaWave.Cache = {
    Memory: MemoryCache,
    Win: WinCache,
    Properties: PropertiesCache
};

})();