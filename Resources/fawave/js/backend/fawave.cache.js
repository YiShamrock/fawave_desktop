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
 * ���������
 */
FaWave.Cache = {
    Memory: MemoryCache
};

})();