import './style.scss'
import { Controller } from '@/core/controller';

function start () {
  const app = new Controller([70, 50], {}, 5)

  app.init()
}

start()
