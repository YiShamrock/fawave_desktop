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
 * ���������
 */
FaWave.Cache = {
    Memory: MemoryCache,
    Win: WinCache
};

})();