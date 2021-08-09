/**
 * usage: 将对neo4j的请求转发到neo4j服务器并返回结果
 */

const Koa = require("koa");
const cors = require("koa2-cors"); // plugin for cors

const neo4j_host = "localhost"; // neo4j server host
const neo4j_port = "7687";
const listen_port = "3000";
const username = "neo4j";
const password = "daxiahyh";

// a Koa App
const app = new Koa();
app.use(cors()); // use cors to bypass protection from browsers
app.use(async (ctx) => {
  const query = ctx.query.query;
  const neo4j = require("neo4j-driver");
  const driver = neo4j.driver(
    `bolt://${neo4j_host}:${neo4j_port}`,
    neo4j.auth.basic(username, password)
  );
  const session = driver.session();

  try {
    // fetch res from ndeo4j
    const results = await session.run(query, {});
    ctx.body = results;
  } catch (err) {
    console.log(err);
  } finally {
    await session.close();
  }
  await driver.close();
});

app.listen(listen_port, "0.0.0.0");
console.log("listenning: " + 3000);
