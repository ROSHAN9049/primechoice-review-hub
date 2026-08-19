import { ArrowUpRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { categories } from "@/data/categories";
import { reviewsByCategory } from "@/data/reviews";
import { ProductShowcase } from "@/components/ProductShowcase";

const amazonAllDealsUrl = "https://www.amazon.in/gp/goldbox/all-deals/?ie=UTF8&ref_=sv_gb_1&tag=rehanroshan08-21";
const amazonDemoProductUrl = "https://www.amazon.in/dp/B0CGDZC2FK?tag=rehanroshan08-21";
const healthSupplementsImageUrl = "https://onemg.gumlet.io/l_watermark_346%2Cw_120%2Ch_120/a_ignore%2Cw_120%2Ch_120%2Cc_fit%2Cq_auto%2Cf_auto/bcfe1d5717cd4afba1c87ee6460776fa.jpg";
const aiToolsImageUrl = "data:image/webp;base64,UklGRloYAABXRUJQVlA4IE4YAAAwcACdASq0AAABPu1oqU+ppiOqLBcccUAdiUAYsJRFZZqtPggM9/76vpp/xW8M52XTs/QAoJuoXz9fTpfnSvmkwFHy/jrMX94I6Hxbyznj0+sewL40ukr+66bcboknjlpaLUOQq3hxaNlcwxxLwwuDUzKZ2BlMmZH6/CDTQixrZuwrAeuPlyLwWsijmvtEO+ywrhA6S2yRDfcEptz91PSDzC/U2/xGsxNyhA19LcoZFx1/RHfvInMptHiW4OAt/Z4MrIORHzQXF1CrTjRnPm2w++I+yeEJCIU5iMLHbD49aEgG6il+7uFoEcI1jXY2opkJr+7DmrhdtDTApxJ457FL/pONA5j2nXtEQHRrLd4r83B4QasCuSEphZP1o+HVfCXAjLqINJs06Rgr0naX7O+eebS1JF9RzhFBGOC0+R18Xj3ZNFjZNj1oAVzMWbrnSdvxuVtgH83qwHH5y+l/JkCv5SdaQg//2v3KvSfEfC+y4TkznfTa+MqWgbmGx9JrMvrekrctedIfjJNeRnTWVtG6CyVjIhMeMu8TsnETHoTDzudOagsGyoBivYt0yb04QXWMZzvYNT48uE0eVVXiEb9iF0u5T/vWHi4M/JkOpQcuklG98qAUrW14W4XpvTKjoWE02//EOyQ1pJNu48oysKjKlftYkYNod4Lm/kW9kuS9rGC1T4BwWbRQkMLqBbRLzWT77kprBDbOt2gqTAKqdhoSlWFXIrvZL9QDAv+k2YkCaraS6z+yKbNvEy18gxkMw8kCLcm9BYrn+SWrfQfHT5lo5CegDhQf+bzg+WkcfkNEkMInvAApb3W52p0VZPWRyLcbfNQ+yF3ct34YQsdBV82zp1+7oTmekbrsyW9sdQYY+J8nfdfbGf5B1VEwGy0D/ZtULQI1sJrwd/O/M9ES6nLojHnkXQlm925NER4iz+4bHs1XzXeLB5cruktTHRjFRf9b2zEfaG7yxLdmE4nUXHwR/JeyDGNQ2nmqJP6qO1IIzPQ0orcBoy/4tah4HbTaAw2YAOrwH0dEHETbVKpZ0w3/SutGafmX/4RFgUR1buxhqMSNUX5JGG69LQm2ycUaFLMRW90MyeCwphjxzhZr6PgTVsTmunrOJ04emq6XR+UNF90VEPC6+Ncfeq2vux/VolRb84c5ilcD/wRMHV9KcJd9nlsvJpqeImARp69JQ1BJIeydwhgLM+TkZmAA/vNhSe7SnsJ+vTNfEuft3iwc7m2Q5iMMhxwL73vR4gcw2ymF9CtfQ/LJJHffWhfn8sarn7bG4md+wjsY95oX79a3x1FhObeyvrCTqzvj0NIAiwFlDsn47ssPugrFJ8+iHg77Ea1hxrCcjbeH/NRjf7iW0+V1HqbrH/p3FQ8Rh+llqoqv7n1TP8c7FsuFqcVjLrMv82nkF4OmtTFEM/bMcV++czvOxqWi13YY5vRDDXtcKvrps8QZnaO0ZfEujzhVF5GNslS5KGqdCLFktLu7fG35bd63jp/Q4UxS7JRqwrvEmDAyGdcLufri/KiHk6sIF5colhuueGGdQkrEv3p5MPKLPzCgA3guQiNb15/U9OsUZLOp/RM2sQM0juiM0Rmyawh9HpgJOV6zRxvTZAmN1XJ68zxSC6HIhDpVrfD/qnnhf/0AcbV52AOz1UDmxwd3repdaS2ne5NxyUmeIT/v+IMdz4mSdxUpvb717RzsQ9yyjCuvDo7rYP37d7LcrfJ8FF+j+7WijYvd4xXiCXvTJggITpIamDmKf/8eGa/KkbuLJQmEOKmmojlgQwYNi9y86I+as18PRC3jsEn6sL96LIwuekDygV0psVVnLoHfUnzeviHrtbJAJ3uBnVjuLGGVbluCiO5tZQCCZeB0t/bGgJeXkcwQUx6dq34h+Ax6LaMuQxGt9nMQPmelRVodf6+wG/ksOu1jv+aWtRA9j8TH29K85q5Hb/A+z1+8gjLl/6ewZv6a7UCw/KsAzh/9urZmdqB6MYpm2N6Ik1zlM6pL5v7vsNqzmWsX8Fr3CVbi360hlzCuhZYb60jSN0eaKZIbNM/pCMTruFTmZwTTF+WAZuvgDsoCvAy2580E0LKVG/bPyLH9YymUYFc2fgaAkVS3L9epnLGiTay+CdnEJKc9GAUv3jb2BVpu+otpRyPr/uclmPlU4eo1VQL8C/fkrcFXzuNTrJrTzUw5BNS4ZqGzk4f6dpD8ftjLb2gWAPJqqz6IxHYVslXvVvNWjOffR3svQUX0cvM7W/ThIRitaEMNK2WwYyUKZ/59WchVs6WzKmR7OfHo8NgN11asKk+pZ7V1crNFCU4a3a5p7r810i/QPFywW0jcnAxM71LfkdOf0TyCHqNKmbCERNsJMSoqZQHXEP7d4kqETWs63tV4u02B3K7QxQrLfDuPk5R1UeJn9kb7HiG61xQ2eUsSMnRxWHeupBNOCYBURbMtpAxzsV9jkT2f3CUTM6drVgv4Qfc+6joMbSUlE9OTyG5S4YjTBhGMeVNxwMhfso53vnlCu1Itig+pPKAVXRqsbtYfoqrIJD1L85HNOGCOI24vvkOgq6YZq+BsWBm95bu/a8IIxLKoZ0xfEiZXltY+9e08JoYMXVeL1YzzfLd88yxi0GDQFdU9pJA1dM9slyOoXmbtIyYZBmOHacKdmoqXv1R2Hyxisn53aoTmg1diil2zN2lUNlWGFI6sJf4qkZEyuGlKkHk5lR/Qjul+ZtNo5W6U3wf5tVwBEbgYVCprjj6HocVywyHBHt7ICxg7R2DsQjQ0Itbkv2JQ4F8u05fkFQ3AffB9dSToA+TDUcBbapu80/Qw/sqHB4vpAAFBmmfpQyejFhmIsweBrnhe/W3zQX5HdXTWI5me3FvYRSOR5/ikxHslrDQYW/kv4SFSwQkkztECQFB83gmp7zgL1yZGO5PCcJSvo6z2frXiClLz/YE/Tt/LHaDWJLnbu0GLyCM7HveH1MYVSj+5U0dO/QasrCjCjRSxneCLuHYieun+Li8w+0MS7iSl9HE34gtWng1poad1MxFIDbsJTecFAYIQrgzFOcWT1S0JbCzYqnQNftXCpiB4ez+PDI3bTef9Jg5816imG7SkkZ16qhDktjFGSM4KNeu/fFRMHh+s+mxLk4im3PouYFZ/i3Ub5+jq2RH/6qpmihr/EPMOtOUGBdslkguTB0xJltbUafnWaahQ//OiluY/ANqtY8HiZQebaR5ZTnTWX6mYSN4epSGAfInZpECITIQhlqcqBvbK4YQVd6NU9GTUBnlmE9R6UgK/8NyxUT/cIQs6qVQv7vBsf4fvKy8X2PVr8ajR4q9h3EL/C5ufKVPm1pqeI7vWf1pR0fPVQG/o0vFQjGGQfZXurZG3TpWRSk28H8TAfws4/fMnWF7c9GWTA9zCbjM+nX17CoYEl0skDO5ge9tNBHSJu/Z1iXlCCvyqhN1LufNeQptLm1FBAToswka1xTdb2+FJbfiV9yZXwOTffLYA2PZdK0hpdRC6fp/c8hE+RP+z9nDZHLrUpxkzCCCgPWTG5BJqmoBc68U0zCNG4duyafkOyecOA6E3hgYbbgZCCLWCjk4FggLRvL7q3Mqomb7Zj3lz87FAh4PbfVRGRSdQnaUJuyb73rpBz5yg/BVy7EcoQuG4suINyK6wpAoVgP1zTkKCHDX1IM7dg1rELfk6/AyZGyhHL6iH6Y4Ftp+H1ZUAwNkHegKikTOOmikdjiBmNHyLSwq8Xh8dTgQRCc5K3d0o9lNHaJN6pOAOYozu9T1bw5MMRgtW25TDelalXwAFkKglCIhPx1CqOIPs9M8faHE92HZlZyZ/L2G+pUxjXJux8gbCWsiyQB4IzEjhqTRDqjsboa9qmuGm7KGY5y4OVfyr2SaeRZbhj9QCWWOE8UbQs2XlorF3umDjXcM/GQk+VmubVnkNFt/Ix+t1v5RF3/l4aLor3tgyp83+fmz052UkdMFvmdLb/YME0xrSDD4scow+UNxWjHd5KByOzkZmIoSXRVkIbcLKDPfhnd3jCraxiQdk7Mmy+Z2E5Pv6cFjGrDryPPG0EPzr/XzAVALx2NfDNP3wLseEOwrNFir1UguLHWKVAuNmmDm5cgbtGHTWaCw50nsmjH6JyfmH7/1n/Snmu3Kpat1BoNABCaJ1yS14ossaxBB4WdJH6s15vXqAfRkzFMwnVwogJPaTsz8qu1Jisakiluy3hUZbv1s049vVy+TJ0gyLvuBA8/Kn9duCDNF9ZqqYeI82xvTPxbCB5tYdCsTynWJOvm48iMmNr6etBeFW/Byg6N/Pkd0Yg+Q3+b1SXzImb9NsuR9zXRk7wagGK4hPyksRgQ58Uylv+Z9bbb5XT2Cfokk/EeXB0SF/XPC/OPKssFRMjoW/nNlIrBHdzzQn3gZtNRK3juU/TbI60Ce1rqlIErI0rHXq1YAnwnlGq0AW5woJFYKFDmbW1OvH8fxm0S4I18DDjgjZlZcuF+8EDEPj7PHh6G76xVB65EszW0xGQ4TYsehFS4RTZgKZThhtxkK64NQq5lVPN5ZdQIWOUerDm51bL+A3cRhqgpSzexuS0M3xirWCEvEfwq159a2Wji+6S+RGE0B1+F8jv8OusDqP8cgRzeYvsb4zc5Rh3lVMwLCFHVIjPnca2zvIBIbsOUeAAoXePEUh9MXm/H34nYjsjf4A+A2QUQXN4gjA2SZ0fxZmyL2ievhaPh3ONsETwsZoRIT8lEEBP+HVILM8Bs1n1Fmk5mmbLns0998d/mQOsWLMSyF6jLFxJXrd1gihKVRRcLnDFM6gAjWXs4aZS1rotUTqqNkNVIy9DyRuwCdNy/T5fc3tYXjsq4hJnEK3ZnmmCdAxlwNiViltNm/+aZhlADSlCGPWtJuK93rSAPSzqYud26lC4d7TUainOrSs3ZYUkbtn+vCQsroBc44GQgzfHY8nAf6bkdov31TTUX6AxpiwJo0TSyuETHzILK3Or2CmEzQKBuu1Uo+tL+1Zx6jr6GH//iW0lE8b/TNb/eGmJVZeYFtFMfp2MhTN9i3cslI8dC+FPB1KgkKKnCVCSdHiekpx6M7XyAAKNisf2hN4T2RCdqiCWIfk8V9Q50v2ygyjj4R3faz3fJIjsRvlErx4k0oLPMeu36Y9/VRllCb6I6cMeO1XlHP++K8c2ZwvTXz5LyneXltFa+80Wh5F5eVEmTWttL+Osxc41nomqysANpvNJRJWYeHwgJC3kqhlIvpwIqC21XZQkuw/Cb9z7j7X5LWcMcWkHjHcORJ1ekJlqOUIL4DAaoe7t6QO73uKeOZzvWgrH/MXWoOSejTDyzXuNVlDHBbCGCkS6Mxpmy1kAJly/xftI2l2TogXlcJsX08RigXrk/UTk4/LmDBYxX3JAHnYRwmL/hypq/1X+DJM2Zpuz6H8SsSvb4oNpNVBywNWUSoXd+aYeO0IIaswx5T7pUJx2RbU4I4wf4OCQDB3fyWwu/HcgHDTQX/qZ2a9Ev/g18QsoELvo73FdjQcdzLvddkCikyzMsyHqGDKNq+rK8q53Lv6fbOgTTLeQpw4d0NiQe1r30hCjCPHq+L0zLED3JvpvDlzTUmf35y2tx/XnQsM96RDgyvlrwuzdHC0n08B3hq4Nl/RF5MQdbeiS4td5FP8Of4Yuz3MHduXadQ1D4RtGNIKeMzBdb+QOmwUEMlMC6GCv4yPMfG75qKA/ppEQk4FAf7fh9y8e17QrhbdhtEDczpk7ryN75v2TJMtID/xjOuJ2HZA7KgjnqrusNXHieBl/V7a0gDgwD/nK1408LXrOPWK9nBzrVW4Fw1iqUGGzBU1o+mAvvXNxNzRndSvM2me7oUp+nGT0oUADrGzQo/HV116EiUk7m6T456U3X4qa/ANHSUQWjBwGuWuXKLSMmqcqiHBHBNvpmoN+iMIEGVbY/RM1WUw5cpHp+N0l3XeBFwtpcOxPFoIP6Cbs69vHn6kSwgLWX6bca98m73ar3kzWG3Ez8Tr/Yitg+ZzoOuwf5yK17FLPTykNWwCBWrOD14entWPZKt5/FoMnNkO6XATpYFsah6oRhf3SkrhIHdt05eiOyArmdoOWdYjeKPdbBdTCTzkzC25ErUQTk1nOywpJmmd5/c4D7m/cSzPkTeGKoODuVP61VSXQlB7z/YjTop5gNiDVGXzuKWFTcnw49gOQEdpR6AmT6YpiZ/1/kcSyfhqWMVUHXTr8FV17XJ1ZV4mqIDFyfVF0PIftWrVnLGzWEfXG28eVYiJz1/co5TpXHdb0znoJhTS9vcZv1Q0M0wDYJZ+4GDMsBMkIewke10Bqjkv4EobzguqvhCx5GU/9oFYtvpBt4d/ArX6wH/oAk83yNxjXBne0oFfGeSMOJVYF8GjVfHH0vBQFMtIkAZKq88rWlGUfntOndDPSFdiicaEQQZMpdzkt0EXnJK5+WmLOGsxNzi7L6e79Y7rr25kuyv3xMKoSH4fHIZnITnasTvPoPt+7/kfHHAngvEp3o61RsKIBoOnMstZLZg/74cVdFyJyqXq5HeT9s9qW6rHRuEZqjIO0JFsjnUknMdXXXLp9TrX/JOUQeowUzX37LHAx7zSQ4lyqBQ8xoNThAoTHSkAy6JeyfWAvjBQTLkN2qZYpto9LT0Qz/bzDBOHcFW6SekJCafZ5cYdEujZNwAlyiAJYSib+bHkcD48qWWs5Mv+gERaYTwm9xj+PfsDaKwQl7Fpff8t6jPdW5nJUBmXJ6qvCloLGUDWlrZ20Yv8lQNiJxA7E1Ms22zlYjEbW6Si6+0keqdmYEBdBdszJ2UEWIswvvavNUdMh6fyM2Y7BcSG3gtMZQUoOaOgujujVs+GcwlmhKD1Ljo/IKiBhgRQbuIzZAZ6YPXEvrsjCkv/SmCb5JUXbJh80m8xd5SxqDPz3Q8BNaymmCowLMUXrQy7GTf7rvqNiNqF2/BARW3gxDaM6e5YGOYcuBSBioRfLZlpxLpLWrsZAyBbttu3hB7z1J7N1VBeyZZ4D7E3937qDxXZieIlJmoKTQmoslAE/vdM0XbXlpeR7MDXlRY0sHi5xXHD95QzjhfL6lxxAVRvNY4XeX9Kd4j+LPgDh49dK9X/J8euSDeho04I+oXl0bNErBhDdI+xxzo4hPOfsk7l6+2FuCcB9iszqz7P5HFqlc9VzxUhznzRd2u8JftUPN1qXnr/tOOI7rgah3lzsXP9iurXFXTgPQhSqR/V1+op9lFHJx0bLOijY158jmvG3jqCic6Yb2QEIYEikavntGlYjfNsQlfBvFqEcQKDcS6G7DaAqkXDadFY0+jGqcZpEbyWnBO+VdvkraywjM1A6l591DbRZpTUbKoYFPTh8p4nDOaYPpu79GB/ikwLty5Rif4TU0wLCIQWta3/lFkW0WP8DxUCaTzHjXcOSNHruLBBK/9c2ZTQIcFbutGxeU4T84qXaJEDpiINom4sUvnqoif0r9od/mLir342UsAValAbqKcSJwUPNSKIqyIlBEtXwdDgHyuUB6D4Tggo9YkFKX8P2Bgh4VufpYcSVj31xPJ8td4VjRZAyj16Y9IwbUQOSW1Gp2m311G4NdHSg11KWsykwNGMueSTIiP8hJ+kdSPZk9DXQcUYb3sHEm8csFTEvo8GZU8xHjjI6ePQqTkax7C6MY+iPAwuFRn41qlPJ/QPH5h6uWHeY1jTX7ee/0kJrs1rwOtHXRFh0oVJ/G2EQC5aETRcjisgudJFqy5zAfH4/y7TDeJTcJJSnBps9Ks52Z0z3rv7QbAWxnIxZCCq/bG80fJZ1YK5SeN6iDqnZbfptlm6d3DJjCU/3Cb8rxap5li6kOI4lp4XaSSSs3/+CrUF+LZ9258cL2/WRvjS1eMG24ebawf7txRnYOysb367qBnIa63HbntYvWkwGcIWwrkRhU29WJjM8KXGpYsL8gR8d79mxknEjpdNLO+9GlKyxHR2mkUFa6QLZUHjWem0Qv5Szrd9gscPOMRBk2OhRRGNrPlgi/IFoaHC9XLlAKgBVt9VSKOcHkVkvxupFZAlfnElrvro1ugruEEBJLK1azDcWECFFHQfOhOVpFHd1IfVeumb3NwC8lFe119dx7lpFC0Wc9e6WpgMscIN09yOyU8REsT91Ufw3moz/iNnandvsoOgcZJX56lunvWYO3v9pTwdIWHGR7ysM2RhO7mvqPmH9lMOFLRxmysUzR+tf9r2JywonNX9thKJKf7ZsTAHiHhc5azK4SELt2pZODPdkON75nx0hnTj8s2hkZYdttYel7iV7JG18OIkjPcs6Di8RXiQXMwfqiZFOVulYzkA0j0YUNrYIciXHh/EAAA=";

export function CategoryGrid() {
  return (
    <>
      <section aria-labelledby="amazon-all-deals-heading" className="mb-8">
        <a href={amazonAllDealsUrl} target="_blank" rel="noopener noreferrer sponsored" aria-label="Amazon India All Deals — shop all deals" className="group relative block overflow-hidden rounded-2xl border border-border bg-black shadow-elevated transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl">
          <img src="/amazon-all-deals.svg" alt="Amazon India All Deals — shop all Amazon deals" width={1600} height={520} loading="lazy" decoding="async" className="h-auto w-full transition-transform duration-700 group-hover:scale-[1.01]" />
          <span id="amazon-all-deals-heading" className="sr-only">Amazon India All Deals</span>
        </a>
        <div className="card-surface mt-5 overflow-hidden rounded-2xl border border-border">
          <div className="grid items-center gap-0 md:grid-cols-[260px_1fr]">
            <a href={amazonDemoProductUrl} target="_blank" rel="noopener noreferrer sponsored nofollow" aria-label="Demo Amazon product — open on Amazon India" className="block bg-secondary p-4">
              <img src="/amazon-demo-product.svg" alt="Demo product image for Logitech G PRO X Superlight 2" width={800} height={620} loading="lazy" decoding="async" className="h-auto w-full rounded-xl" />
            </a>
            <div className="p-6 sm:p-8">
              <span className="kicker">Amazon India · Demo Product</span>
              <h2 className="mt-2 font-display text-2xl font-bold tracking-tight">Logitech G PRO X Superlight 2</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">Demo product card with image and your India Associates tracking ID. Price and availability can change, so check the live Amazon page before buying.</p>
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <a href={amazonDemoProductUrl} target="_blank" rel="noopener noreferrer sponsored nofollow" className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-primary px-5 py-2.5 font-display text-sm font-bold text-primary-foreground hover:opacity-90">View on Amazon <ArrowUpRight className="size-4" aria-hidden="true" /></a>
                <span className="text-xs text-muted-foreground">Affiliate link · India ID: rehanroshan08-21</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((c) => {
          const Icon = ((Icons as unknown as Record<string, LucideIcon>)[c.icon] ?? Icons.Tag) as LucideIcon;
          const count = reviewsByCategory(c.slug).length;
          const cardClassName = "card-surface group flex h-full items-start gap-4 rounded-xl p-5 hover:-translate-y-1 hover:border-primary/30 hover:shadow-elevated";
          const categoryVisual = c.slug === "health-supplements" ? (
            <img src={healthSupplementsImageUrl} alt="Centrum Women multivitamin supplement" width={96} height={96} loading="lazy" decoding="async" className="size-20 shrink-0 rounded-lg bg-secondary object-contain p-1 sm:size-24" />
          ) : c.slug === "ai-tools" ? (
            <img src={aiToolsImageUrl} alt="Generative AI 360 book cover" width={96} height={96} loading="lazy" decoding="async" className="size-20 shrink-0 rounded-lg bg-secondary object-contain p-1 sm:size-24" />
          ) : (
            <span className="grid size-11 shrink-0 place-items-center rounded-lg text-primary-foreground" style={{ backgroundImage: "var(--gradient-primary)" }}>
              <Icon className="size-5" aria-hidden="true" />
            </span>
          );
          return (
            <li key={c.slug}>
              {c.affiliateUrl ? (
                <a href={c.affiliateUrl} target="_blank" rel="noopener noreferrer sponsored nofollow" aria-label={`${c.name} — open Amazon deals`} className={cardClassName}>
                  {categoryVisual}
                  <span className="min-w-0">
                    <span className="flex items-center gap-2 font-display font-bold tracking-tight transition-colors group-hover:text-primary-glow">{c.name} <ArrowUpRight className="size-4" aria-hidden="true" /></span>
                    <span className="mt-1 block text-sm text-muted-foreground">{c.description}</span>
                    <span className="mt-2 block text-xs font-semibold text-primary-glow">Amazon Fashion Deals</span>
                  </span>
                </a>
              ) : (
                <Link to="/categories/$slug" params={{ slug: c.slug }} className={cardClassName}>
                  {categoryVisual}
                  <span className="min-w-0">
                    <span className="block font-display font-bold tracking-tight transition-colors group-hover:text-primary-glow">{c.name}</span>
                    <span className="mt-1 block text-sm text-muted-foreground">{c.description}</span>
                    <span className="mt-2 block text-xs font-semibold text-primary-glow">{count} {count === 1 ? "review" : "reviews"}</span>
                  </span>
                </Link>
              )}
            </li>
          );
        })}
      </ul>
      <ProductShowcase />
    </>
  );
}
