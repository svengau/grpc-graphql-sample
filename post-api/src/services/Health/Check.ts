export default async function (ctx: any) {
  console.info('Check health')
  ctx.res = {status: "SERVING"};
}
