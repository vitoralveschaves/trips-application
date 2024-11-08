'use client'

import { QuickSearch } from "./components/quick-search"
import { TripSearch } from "./components/trip-search"

export default function Home() {
  return (
    <div>
      <TripSearch />
      <QuickSearch />
    </div>
  )
}
