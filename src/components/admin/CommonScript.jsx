export default async function CommonScript() {
  await import('jquery.nicescroll/jquery.nicescroll');
  await import('nicescroll/jquery.nicescroll')
  await import('bootstrap/js/dist/dropdown'); // Pastikan ini jalan lebih dulu
  await import('bootstrap/js/dist/tooltip')
  await import('../../../public/assets/js/scripts');
  await import('../../../public/assets/js/custom');
}