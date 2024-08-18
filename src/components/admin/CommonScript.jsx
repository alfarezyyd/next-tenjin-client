export default async function CommonScript() {
  await import('jquery.nicescroll/dist/jquery.nicescroll');
  await import('nicescroll/jquery.nicescroll')
  await import('../../../public/assets/js/scripts');
  await import('../../../public/assets/js/custom');
}