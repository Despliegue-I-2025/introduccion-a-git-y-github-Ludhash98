
const os = require('os');

console.log('DIAGNÓSTICO DEL ENTORNO');
console.log('Versión de Node.js:', process.version);
console.log('Sistema Operativo:', process.platform, os.arch());
console.log('Argumentos:', process.argv);
console.log('motor v8:', process.versions.v8);
console.log('Memoria usada:', Math.round(process.memoryUsage().rss/1024/1024), 'MB');