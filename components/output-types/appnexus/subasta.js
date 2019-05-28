const ads_d_300x600_size = [300, 600];
const ads_d_300x250_size = [300, 250];
const ads_d_160x600_size = [160, 600];
const ads_d_970x250_size = [970, 250];
const ads_d_728x90_size = [728, 90];
const ads_d_970x90_size = [970, 90];
const ads_m_320x50_size = [320, 50];
const ads_m_300x250_size = [300, 250];

const port_boton1 = [
	"port2",
	"port3",
	"port8",
	"port9",
	"port10",
	"port11",
	"port13",
	"port15",
	"port16",
	"port17",
	"port21",
	"port22",
	"port23",
	"port26",
	"port28",
	"port29",
	"port30",
	"port31",
	"port32",
	"port33",
	"port34",
	"port36"
];
const port_boton2 = [
	"port2",
	"port3",
	"port9",
	"port10",
	"port13",
	"port15",
	"port16",
	"port22",
	"port29",
	"port36"
];
const port_zocalo1 = [
	"nota1",
	"nota2",
	"nota3",
	"nota4",
	"nota5",
	"nota6",
	"nota7",
	"nota8",
	"nota9",
	"nota10",
	"nota11",
	"port2",
	"port3",
	"port4",
	"port5",
	"port6",
	"port7",
	"port8",
	"port9",
	"port10",
	"port11",
	"port12",
	"port13",
	"port14",
	"port15",
	"port16",
	"port17",
	"port18",
	"port19",
	"port20",
	"port21",
	"port22",
	"port23",
	"port24",
	"port25",
	"port26",
	"port27",
	"port28",
	"port29",
	"port30",
	"port31",
	"port32",
	"port33",
	"port34",
	"port35",
	"port36",
	"port38"
];
const port_zocalo2 = [
	"nota1",
	"nota2",
	"nota3",
	"nota4",
	"nota5",
	"nota6",
	"nota7",
	"nota8",
	"nota9",
	"nota10",
	"nota11",
	"port2",
	"port3",
	"port4",
	"port5",
	"port6",
	"port7",
	"port8",
	"port9",
	"port10",
	"port11",
	"port12",
	"port13",
	"port14",
	"port15",
	"port16",
	"port17",
	"port18",
	"port19",
	"port20",
	"port21",
	"port22",
	"port23",
	"port24",
	"port25",
	"port26",
	"port27",
	"port28",
	"port29",
	"port30",
	"port31",
	"port32",
	"port33",
	"port34",
	"port35",
	"port36",
	"port39"
];
const port_top = [
	"nota1",
	"nota2",
	"nota3",
	"nota4",
	"nota5",
	"nota6",
	"nota7",
	"nota8",
	"nota9",
	"nota10",
	"nota11",
	"port2",
	"port3",
	"port4",
	"port5",
	"port6",
	"port7",
	"port8",
	"port9",
	"port10",
	"port11",
	"port12",
	"port13",
	"port14",
	"port15",
	"port16",
	"port17",
	"port18",
	"port19",
	"port20",
	"port21",
	"port22",
	"port23",
	"port24",
	"port25",
	"port26",
	"port27",
	"port28",
	"port29",
	"port30",
	"port31",
	"port32",
	"port33",
	"port34",
	"port35",
	"port36",
	"port37"
];
const port_left = ["nota1", "nota2", "nota3", "nota6", "nota7", "nota8"];
const port_right1 = ["nota1", "nota3", "nota6", "nota7", "nota11"];
const port_right2 = ["nota1", "nota3", "nota6", "nota7", "nota11"];
const port_fotogaleria2 = ["nota2", "nota8"];
const port_fotogaleria3 = ["nota2", "nota8"];
const port_middle1 = [
	"nota4",
	"nota5",
	"port1",
	"port2",
	"port3",
	"port4",
	"port5",
	"port6",
	"port8",
	"port11",
	"port13",
	"port14",
	"port16",
	"port17",
	"port21",
	"port22",
	"port29",
	"port31"
];
const port_middle2 = ["port1", "port3", "port29"];

const desktop_rubicon = {
	zoneId: "1062130",
	siteId: "215748",
	accountId: "19186"
};

module.exports = [
	{
		name: "criteo",
		values: [
			{
				space: "boton1",
				div_id: "ads_d_boton1",
				size: ads_d_300x600_size,
				params: {
					zoneId: 1233567
				},
				ports: port_boton1
			},
			{
				space: "boton2",
				div_id: "ads_d_boton2",
				size: ads_d_300x250_size,
				params: {
					zoneId: 1233566
				},
				ports: port_boton2
			}
		]
	},
	{
		name: "pubmatic",
		values: [
			{
				space: "zocalo1",
				div_id: "ads_d_zocalo1",
				size: ads_d_160x600_size,
				params: {
					publisherId: "157414",
					adSlot: "1619210@160x600"
				},
				ports: port_zocalo2
			}
		]
	}
	{
		name: "rubicon",
		values: [
			{
				space: "zocalo1",
				div_id: "ads_d_zocalo1",
				size: ads_d_160x600_size,
				params: desktop_rubicon,
				ports: port_zocalo1
			},
			{
				space: "zocalo2",
				div_id: "ads_d_zocalo2",
				size: ads_d_160x600_size,
				params: desktop_rubicon,
				ports: port_zocalo2
			}
		]
	}
];
