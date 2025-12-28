import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { CloudRain, MapPin, ArrowSquareOut } from "@phosphor-icons/react"
import { useState } from "react"
import { Alert, AlertDescription } from "@/components/ui/alert"

function App() {
  const [eoaError, setEoaError] = useState(false)
  const [woaError, setWoaError] = useState(false)

  const username = "admin"
  const password = "admin"

  const stations = [
    {
      name: "EOA Weather",
      baseUrl: "http://161.99.100.251/admin/mainreadouts.php",
      hasError: eoaError,
      setError: setEoaError
    },
    {
      name: "WOA Weather", 
      baseUrl: "http://161.99.100.30/admin/mainreadouts.php",
      hasError: woaError,
      setError: setWoaError
    }
  ]

  const getAuthUrl = (baseUrl: string) => {
    const url = new URL(baseUrl)
    url.username = username
    url.password = password
    return url.toString()
  }

  const handleOpenInNewTab = (baseUrl: string) => {
    window.open(getAuthUrl(baseUrl), '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="max-w-[1800px] mx-auto space-y-6">
        <header className="flex items-center gap-3 pb-4 border-b border-border">
          <CloudRain size={32} weight="fill" className="text-accent" />
          <h1 className="text-3xl font-bold font-mono-tech tracking-tight text-foreground">
            DUAL WEATHER STATION MONITOR
          </h1>
        </header>

        <Alert className="bg-muted border-accent/20">
          <AlertDescription className="text-sm text-muted-foreground">
            Authentication credentials are automatically embedded. If you experience any issues, try opening the station in a new tab.
          </AlertDescription>
        </Alert>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {stations.map((station, index) => (
            <Card key={station.name} className="flex flex-col bg-card border-2 border-border shadow-lg">
              <CardHeader className="bg-primary text-primary-foreground py-4">
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <MapPin size={24} weight="fill" className="text-accent" />
                    <span className="font-mono-tech text-2xl tracking-tight">
                      {station.name}
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleOpenInNewTab(station.baseUrl)}
                    className="gap-2 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/20"
                  >
                    <ArrowSquareOut size={16} weight="bold" />
                    Open in Tab
                  </Button>
                </CardTitle>
              </CardHeader>
              <Separator className="bg-accent h-1" />
              <CardContent className="flex-1 p-0 relative">
                {station.hasError ? (
                  <div className="flex items-center justify-center h-[600px] p-8 bg-muted/30">
                    <div className="text-center space-y-4">
                      <CloudRain size={64} className="text-muted-foreground mx-auto" />
                      <div className="space-y-2">
                        <p className="text-lg font-semibold text-foreground">
                          Unable to load weather station
                        </p>
                        <p className="text-sm text-muted-foreground max-w-md">
                          The weather station may be unavailable, or your browser may be blocking the embedded content.
                        </p>
                      </div>
                      <Button
                        onClick={() => handleOpenInNewTab(station.baseUrl)}
                        className="gap-2"
                      >
                        <ArrowSquareOut size={20} weight="bold" />
                        Open {station.name} in New Tab
                      </Button>
                    </div>
                  </div>
                ) : (
                  <iframe
                    src={getAuthUrl(station.baseUrl)}
                    className="w-full h-[600px] lg:h-[700px] border-0"
                    title={station.name}
                    sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
                    onError={() => station.setError(true)}
                    loading="lazy"
                  />
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <footer className="text-center text-xs text-muted-foreground pt-4 border-t border-border font-mono-tech">
          Unified Weather Station Dashboard • EOA & WOA Monitoring System
        </footer>
      </div>
    </div>
  )
}

export default App