'use client'

import Stats from './(Page)/stats';
import QRCodeReader from './(Page)/qrCodeReader';
import Timeline from './(Page)/timeline';

export default function Home() {

  return (
    <main className="">
      <div>
        <Stats/>
        <Timeline/>
      </div>

      <QRCodeReader/>
    </main>
  )
}
