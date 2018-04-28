export function handleMenuRoutes(hotlines) {
  let officeNumbers = []
  let serviceNumbers = []
  const officeNumbersRoutes = []
  const serviceNumbersRoutes = []
  officeNumbers = hotlines.filter(hotline => hotline.type === 'office')
  serviceNumbers = hotlines.filter(hotline => hotline.type === 'CSKH')

  for (let i = 0; i < officeNumbers.length; i = i + 1) {
    officeNumbersRoutes.push({
      id: officeNumbers[i]._id.$oid,
      status: officeNumbers[i].status === 'active' ? 'registered' : 'pending',
      name: `tong-dai-${officeNumbers[i].hotline_number}`,
      redirect: {
        setting: `/tong-dai-van-phong/cau-hinh/${officeNumbers[i].id}/${officeNumbers[i].hotline_number}`,
        report: `/report/${officeNumbers[i].id}/${officeNumbers[i].hotline_number}`
      },
      meta: { title: officeNumbers[i].hotline_number }
    })
  }

  for (let i = 0; i < serviceNumbers.length; i = i + 1) {
    serviceNumbersRoutes.push({
      id: serviceNumbers[i]._id.$oid,
      status: serviceNumbers[i].status === 'active' ? 'registered' : 'pending',
      name: `tong-dai-${serviceNumbers[i].hotline_number}`,
      redirect: {
        setting: `/tong-dai-cskh/cau-hinh/${serviceNumbers[i].id}/${serviceNumbers[i].hotline_number}`,
        report: `/report/${serviceNumbers[i].id}/${serviceNumbers[i].hotline_number}`
      },
      meta: { title: serviceNumbers[i].hotline_number }
    })
  }

  return { officeNumbersRoutes, serviceNumbersRoutes }
}
