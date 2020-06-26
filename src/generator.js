// console.log('Vòng lặp vô tận');
// function* helloGeneratorFunction() {
//   while (true) {
//     yield 'Tôi đang lắng nghe ';
//   }
// }
// const interator = helloGeneratorFunction();
// console.log('resulut 1', interator.next());
// console.log('resulut 2', interator.next());
// console.log('Genarator lồng cấp');
// Xin chào ==> Redux-Saga ==> Kết thúc
// function* printName() {
//   yield 'Redux-Saga';
// }
// function* helloGeneratorFunction() {
//   yield 'Hế Lô ';
//   yield* printName();
//   yield 'Kết thúc';
// }
// const interator = helloGeneratorFunction();
// console.log('resulut 1', interator.next());
// console.log('resulut 2', interator.next());
// console.log('resulut 3', interator.next());
