const DataController = require("../controllers/dataController");
const router = require("express").Router();

router.get("/", DataController.home);

router.get("/add", DataController.add);
router.post("/addLogic", DataController.addLogic);

router.get("/edit/:id", DataController.edit);
router.post("/editLogic/:id", DataController.editLogic);

router.get("/show/:id", DataController.showSingleData);

router.get("/delete/:id", DataController.delete);
router.get("/deleteAll", DataController.deleteAll);

router.get("/status/:id", DataController.status);

router.get("/search", DataController.search);

module.exports = router;
