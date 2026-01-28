const Barber = require('../models/Barber');

// @desc    Get all barbers
// @route   GET /api/barbers
// @access  Public
exports.getBarbers = async (req, res) => {
  try {
    const barbers = await Barber.find({ isAvailable: true });
    res.status(200).json({
      success: true,
      count: barbers.length,
      data: barbers
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single barber
// @route   GET /api/barbers/:id
// @access  Public
exports.getBarber = async (req, res) => {
  try {
    const barber = await Barber.findById(req.params.id);
    if (!barber) {
      return res.status(404).json({
        success: false,
        message: 'Barber not found'
      });
    }
    res.status(200).json({
      success: true,
      data: barber
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Create barber
// @route   POST /api/barbers
// @access  Private/Admin
exports.createBarber = async (req, res) => {
  try {
    const barber = await Barber.create(req.body);
    res.status(201).json({
      success: true,
      data: barber
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update barber
// @route   PUT /api/barbers/:id
// @access  Private/Admin
exports.updateBarber = async (req, res) => {
  try {
    const barber = await Barber.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!barber) {
      return res.status(404).json({
        success: false,
        message: 'Barber not found'
      });
    }
    res.status(200).json({
      success: true,
      data: barber
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete barber
// @route   DELETE /api/barbers/:id
// @access  Private/Admin
exports.deleteBarber = async (req, res) => {
  try {
    const barber = await Barber.findByIdAndDelete(req.params.id);
    if (!barber) {
      return res.status(404).json({
        success: false,
        message: 'Barber not found'
      });
    }
    res.status(200).json({
      success: true,
      message: 'Barber deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
